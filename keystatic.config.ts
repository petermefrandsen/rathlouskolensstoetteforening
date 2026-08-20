import { config, singleton, fields } from '@keystatic/core';

export default config({
  storage: process.env.NODE_ENV === 'production'
    ? {
        kind: 'github',
        repo: {
          owner: 'PretiumBusiness',
          name: 'rathlouskolensstoetteforening',
        },
      }
    : {
        kind: 'local',
      },
  singletons: {
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
        mobilePayQr: fields.image({
          label: 'MobilePay QR Billede',
          directory: 'public/images/uploads',
          publicPath: '/images/uploads',
        }),
        membershipFee: fields.text({
          label: 'Årligt Kontingent Tekst',
          defaultValue: '150 kr. per år for hele husstanden',
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
