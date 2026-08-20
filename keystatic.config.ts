import { config, singleton, fields } from '@keystatic/core';

export default config({
  storage: process.env.NODE_ENV === 'production'
    ? {
        kind: 'cloud',
      }
    : {
        kind: 'local',
      },
  cloud: {
    project: 'rath-stoetteforening/rathloustotte-site',
  },
  ui: {
    brand: {
      name: 'Rathlouskolens Støtteforening CMS',
    },
  },
  singletons: {
    guide: singleton({
      label: '📖 Vejledning & Adgangsguide (Læs her)',
      path: 'src/content/guide/index',
      schema: {
        forEditors: fields.text({
          label: 'For Redaktører & Bestyrelsesmedlemmer (Sådan logger du ind)',
          multiline: true,
          defaultValue:
            '1. Opret en gratis konto på https://github.com/join med din egen e-mailadresse.\n2. Send dit GitHub-brugernavn til webansvarlig (eller formand for støtteforeningen).\n3. Webansvarlig inviterer dig som "Collaborator" til projektet.\n4. Acceptér invitationen i din mail.\n5. Log ind her på /keystatic med din GitHub-konto.\n6. Alle ændringer du gemmer bliver automatisk opdateret på hjemmesiden efter ca. 1 minut!',
        }),
        forDevelopers: fields.text({
          label: 'For Udviklere / Webansvarlige (Sådan giver du andre adgang)',
          multiline: true,
          defaultValue:
            '1. Gå til GitHub: https://github.com/PretiumBusiness/rathlouskolensstoetteforening/settings/access\n2. Klik på "Add people" og søg efter brugerens GitHub-brugernavn eller e-mail.\n3. Vælg rollen "Write" (giver adgang til at redigere indhold via Keystatic CMS).\n4. Brugeren modtager en invitationsmail og kan herefter logge ind direkte på https://www.rathlouskolensstøtteforening.dk/keystatic.',
        }),
        tipsAndTricks: fields.text({
          label: 'Gode råd til indhold',
          multiline: true,
          defaultValue:
            '• MobilePay: Du kan bruge @mobilepay i instruktionsteksten, så indsættes nummeret automatisk med fed skrift.\n• Dokumenter: Uploader du en PDF-fil overskriver den automatisk et indsat link. Sletter du PDF-filen falder den tilbage på linket.\n• Galleri: Galleriet og menupunktet skjules automatisk, hvis der ikke er tilføjet billeder. Når du uploader billeder, vises de med paginering og fuldskærms-visning.',
        }),
      },
    }),
    settings: singleton({
      label: 'Generelle Foreningsoplysninger',
      path: 'src/content/settings/index',
      schema: {
        heroTitle: fields.text({
          label: 'Hero Overskrift',
          defaultValue: 'Rathlouskolens Støtteforening',
          validation: { isRequired: true },
        }),
        heroSubtitle: fields.text({
          label: 'Hero Underoverskrift',
          defaultValue: 'Støtter op om skolen for elever og personale',
        }),
        heroImage: fields.image({
          label: 'Hero Baggrundsbillede',
          directory: 'public/images/uploads',
          publicPath: '/images/uploads',
        }),
        introTitle: fields.text({
          label: 'Om Støtteforeningen Overskrift',
          defaultValue: 'OM STØTTEFORENINGEN',
        }),
        introText: fields.text({
          label: 'Om Støtteforeningen Tekst',
          multiline: true,
          defaultValue:
            'Rathlouskolens støtteforening er en frivillig forening, som alle kan være medlem af.\n\nForeningen har til formål at støtte op om Rathlouskolen og samle midler ind, som kan være til glæde for elever og personale på skolen.\n\nAlle skolens brugere kan søge om midler fra støtteforeningen.\n\nForeningens indtægter opstår ved forskellige arrangementer afholdt af Støtteforeningen. Desuden betales et kontingent fra medlemmerne på årligt 150 kr. Støtteforeningen tager også gerne imod sponsorater og gaver.',
        }),
        quotes: fields.array(
          fields.object({
            quote: fields.text({
              label: 'Citat Tekst',
              multiline: true,
              validation: { isRequired: true },
            }),
            author: fields.text({
              label: 'Afsender / Rolle (f.eks. - Skoleleder Dorte Halberg)',
              validation: { isRequired: true },
            }),
          }),
          {
            label: 'Citater (Karrusel)',
            itemLabel: (props) => props.fields.author.value || 'Nyt citat',
            validation: { length: { max: 5 } },
          }
        ),
        mobilePayNumber: fields.text({
          label: 'MobilePay Nummer / Boks',
          defaultValue: '86561844',
        }),
        mobilePayInstructions: fields.text({
          label: 'MobilePay Instruktionstekst',
          description: 'Brug @mobilepay som pladsholder for nummeret/boksen (f.eks. "Scan QR-koden med MobilePay eller overfør til boks @mobilepay")',
          defaultValue: 'Scan QR-koden med MobilePay eller overfør til boks @mobilepay',
        }),
        mobilePayQr: fields.image({
          label: 'MobilePay QR Billede',
          directory: 'public/images/uploads',
          publicPath: '/images/uploads',
        }),
        membershipFee: fields.text({
          label: 'Årligt Kontingent Tekst',
          defaultValue: 'Kun 150 kr. per år for hele husstanden',
        }),

        // One-time donation
        donationTitle: fields.text({
          label: 'Engangsbidrag Overskrift',
          defaultValue: 'Giv et engangsbidrag',
        }),
        donationText: fields.text({
          label: 'Engangsbidrag Tekst',
          defaultValue: 'Ønsker du eller din virksomhed at støtte med et valgfrit beløb, sponsorat eller gave? Alle bidrag gør en direkte forskel for elever og skole.',
        }),

        // OK Support
        okTitle: fields.text({
          label: 'Støt med OK Overskrift',
          defaultValue: 'Støt Rathlouskolen med OK',
        }),
        okSubtitle: fields.text({
          label: 'Støt med OK Tekst',
          defaultValue: 'Støt Rathlouskolens Støtteforening kvit og frit, hver gang du tanker, lader eller vasker hos OK.',
        }),
        okInfoText: fields.text({
          label: 'Støt med OK Detaljeret Beskrivelse',
          multiline: true,
          defaultValue: 'Når du tilknytter dit OK Benzinkort eller OK Appen til Rathlouskolens Støtteforening (Sponsornummer: 784473), støtter OK vores forening uden at det koster dig en ekstra øre.',
        }),
        okSponsorNumber: fields.text({
          label: 'OK Sponsornummer',
          defaultValue: '784473',
        }),
        okLink: fields.url({
          label: 'OK Støt Link',
          defaultValue: 'https://www.ok.dk/privat/hjaelp/stoet-lokalt/hvordan-stoetter-jeg-lokalt-med-ok',
        }),
        okBanner: fields.image({
          label: 'OK Banner Grafik',
          directory: 'public/images/support',
          publicPath: '/images/support',
        }),
        okLogo: fields.image({
          label: 'OK Logo',
          directory: 'public/images/support',
          publicPath: '/images/support',
        }),

        grantEmail: fields.text({
          label: 'Ansøgnings / Kontakt Email',
          defaultValue: 'stoetteforeningen@rathlouskolen.com',
          validation: { isRequired: true },
        }),
        cvr: fields.text({
          label: 'CVR Nummer',
          defaultValue: '86561844',
        }),
        address: fields.text({
          label: 'Adresse',
          defaultValue: 'Rosensgade 83, 8300 Odder',
        }),
        phone: fields.text({
          label: 'Telefon',
          defaultValue: '86561844',
        }),
        // Galleri Sektion
        galleryTitle: fields.text({
          label: 'Galleri Overskrift',
          defaultValue: 'GALLERI',
        }),
        gallerySubtitle: fields.text({
          label: 'Galleri Underoverskrift / Tekst',
          defaultValue: 'Billeder og glimt fra støtteforeningens aktiviteter og arrangementer.',
        }),
        galleryImages: fields.array(
          fields.object({
            image: fields.image({
              label: 'Billede',
              directory: 'public/images/gallery',
              publicPath: '/images/gallery',
              validation: { isRequired: true },
            }),
            caption: fields.text({
              label: 'Billedtekst / Beskrivelse',
            }),
            tag: fields.text({
              label: 'Event / Kategori Tag (f.eks. Mod-til-at-glæde dag)',
            }),
          }),
          {
            label: 'Galleri Billeder',
            itemLabel: (props) => props.fields.caption.value || props.fields.tag.value || 'Nyt billede',
          }
        ),

        // Kontakt Sektion
        contactTitle: fields.text({
          label: 'Kontakt Sektion Overskrift',
          defaultValue: 'KONTAKT OS',
        }),
        contactSubtitle: fields.text({
          label: 'Kontakt Tekst',
          defaultValue: 'Har du spørgsmål til støtteforeningen, arrangementer eller indmeldelse? Skriv eller ring endelig til os.',
        }),
        contactPerson: fields.text({
          label: 'Kontaktperson / Bestyrelsesformand (valgfrit)',
        }),
        // Vedtægter (File upload or External URL)
        bylawsFile: fields.file({
          label: 'Vedtægter: Upload fil (PDF)',
          directory: 'public/files',
          publicPath: '/files',
        }),
        bylawsUrl: fields.url({
          label: 'Vedtægter: Eller indsæt eksternt link',
        }),

        // Privatlivspolitik (File upload or External URL)
        privacyFile: fields.file({
          label: 'Privatlivspolitik: Upload fil (PDF)',
          directory: 'public/files',
          publicPath: '/files',
        }),
        privacyUrl: fields.url({
          label: 'Privatlivspolitik: Eller indsæt eksternt link',
        }),

        // Handelsbetingelser (File upload or External URL)
        termsFile: fields.file({
          label: 'Handelsbetingelser: Upload fil (PDF)',
          directory: 'public/files',
          publicPath: '/files',
        }),
        termsUrl: fields.url({
          label: 'Handelsbetingelser: Eller indsæt eksternt link',
        }),
      },
    }),
  },
});
