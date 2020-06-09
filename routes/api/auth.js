const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

//@route GET api/auth
//@desc Verifies and returns user
//@access Public

router.get("/", auth, async (req, res) => {
  try {
    //Regresa el user del id del token con toda la info menos el password

    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (e) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route GET api/auth/try
//@desc Verifies and returns user
//@access Public

router.get("/try", async (req, res) => {
  try {
    const body = {
      image_results: [
        {
          position: 1,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoolJUr8GMYcpkIyRGhGCa3d1x6CwtRIJTzkwNLXT79DrXB_fNzA&s",
          sourceUrl: "https://i.ytimg.com/vi/pd4DexKGhHw/maxresdefault.jpg",
          title: "The Gruesome Story of the Pied Piper",
          link: "https://www.youtube.com/watch?v=pd4DexKGhHw",
          source: "youtube.com",
        },
        {
          position: 2,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxUAKRK9oMHB3UfNv83tQOYb8VaOlF2is1HgKOKcJMdTeptEgN&s",
          sourceUrl:
            "https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555442396/shape/mentalfloss/pied_piper2.jpg?itok=UFmW7w9q",
          title:
            "The Enduring Legacy of the Pied Piper of Hamelin | Mental Floss",
          link:
            "https://www.mentalfloss.com/article/63386/enduring-legacy-pied-piper-hamelin",
          source: "mentalfloss.com",
        },
        {
          position: 3,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz4PFl30H749q1gSVWC_hBiwkEVjrfNxRzWtfnDt8HPd8GlLlobg&s",
          sourceUrl:
            "https://compote.slate.com/images/4a2201cb-6bf9-4ccf-a876-09ae9086eef5.jpeg?width=780&height=520&rect=1560x1040&offset=0x0",
          title: "Let the Pied Piper eat in peace.",
          link:
            "https://slate.com/culture/2018/06/let-the-pied-piper-eat-in-peace.html",
          source: "slate.com",
        },
        {
          position: 4,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcE0HMcO8K9M2jn7INsspt05oKjJuN6Xg6cr3ZXjntHUOqlXyQYw&s",
          sourceUrl:
            "http://www.milwaukeeindependent.com/wp-content/uploads/2020/05/052120_PiedPiper_01.jpg",
          title:
            "A Tragic American Fable: The Pied Piper of Coronavirus | The ...",
          link:
            "http://www.milwaukeeindependent.com/featured/a-tragic-american-fable-the-pied-piper-of-coronavirus/",
          source: "milwaukeeindependent.com",
        },
        {
          position: 5,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRraVY0d-qxOHctZafWmyidR8W9swegUV1F9IJOZ3H_8_2-zW_9&s",
          sourceUrl: "https://img1.oastatic.com/img2/26768004/max/t.jpg",
          title: "The Pied Piper of Hamelin • Report » outdooractive.com",
          link:
            "https://www.outdooractive.com/en/story/weserbergland/the-pied-piper-of-hamelin/26589802/",
          source: "outdooractive.com",
        },
        {
          position: 6,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5HM3r5E2ueTbTblWXWD9L9LZU5JXGHnyNImqmsgQQu102i2cc&s",
          sourceUrl:
            "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201610/main-image-pied-piper-647_102816055500.jpg",
          title:
            "Unmasking fairy tales: Was the Pied Piper of Hamelin real ...",
          link:
            "https://www.indiatoday.in/education-today/gk-current-affairs/story/truth-behind-pied-piper-349072-2016-10-28",
          source: "indiatoday.in",
        },
        {
          position: 7,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF-zAEF7lPNgMxYnVLLIL9lUym7vRMpmnL8x2N5iqEN28q2zIxmQ&s",
          sourceUrl:
            "https://upload.wikimedia.org/wikipedia/commons/f/fa/Pied_piper.jpg",
          title: "Pied Piper of Hamelin - Wikipedia",
          link: "https://en.wikipedia.org/wiki/Pied_Piper_of_Hamelin",
          source: "en.wikipedia.org",
        },
        {
          position: 8,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPfpZoiHUL9tbx1Lm9PtkZXvKDMzptOmgdw3GCmVYkqjDAaiw4FA&s",
          sourceUrl:
            "https://3.bp.blogspot.com/-lx-owdkMQng/WQsY_ocR85I/AAAAAAAAhZ0/Hskur2k0OjorvTivLZmorfE4Lk5zHg1uQCLcB/w1200-h630-p-k-no-nu/Pied-Piper-Mom.gif",
          title:
            "Paul's Students Stories: CHILDREN'S CRUSADE: THE PIED PIPER ...",
          link:
            "http://paulstudentstories.blogspot.com/2017/05/childrens-crusade-pied-piper-walt.html",
          source: "paulstudentstories.blogspot.com",
        },
        {
          position: 9,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX2QdSA_MkA1DiQ0moktT1t4H6jlEEDLlvhvFW7jTp3m5wc7CzxA&s",
          sourceUrl:
            "https://orion-uploads.openroadmedia.com/md_29f33eca2549-piedpiper.jpg",
          title: "The Chilling True Story Behind the Pied Piper of Hamelin",
          link:
            "https://theportalist.com/the-chilling-true-story-behind-the-pied-piper-of-hamelin",
          source: "theportalist.com",
        },
        {
          position: 10,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkj10RdOHQ8Jjx9tsh4DmIX1kZR0SjUVhRDWbyJdvYBBnb39KG&s",
          sourceUrl:
            "http://content.bookstellyouwhy.com/hubfs/Rattenfaenger_Herrfurth_Pied-Piper.jpg",
          title: "The Legend of the Pied Piper",
          link: "https://blog.bookstellyouwhy.com/the-legend-of-the-pied-piper",
          source: "blog.bookstellyouwhy.com",
        },
        {
          position: 11,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6hI7-uNubPoeFvaUPif67-eJe9kK-BJYfdGD0wGfJR1tqbZEe&s",
          sourceUrl:
            "https://m.media-amazon.com/images/M/MV5BY2Y5Y2Q5NzctMTM3Mi00ZWI3LWE5MzEtNDZhYzY5MTRmMDFlXkEyXkFqcGdeQXVyNjMxODMyODU@._V1_UY1200_CR134,0,630,1200_AL_.jpg",
          title: "The Pied Piper (1933) - Plot Summary - IMDb",
          link: "https://www.imdb.com/title/tt0024451/plotsummary",
          source: "imdb.com",
        },
        {
          position: 12,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhwIIv6Mn1biDTnjq2Ay0uXGXeHvyag1XYgpnRfrfDkk6c7umVHQ&s",
          sourceUrl:
            "http://lh4.ggpht.com/-QMxHglV01ZU/TxsJ4bvf3uI/AAAAAAAAtig/7_fiVdmhh2s/the_pied_piper_leading_away_the_children_of_hamelin_c1899%25255B5%25255D.jpg?imgmax=800",
          title: "The StoryTeller!: ~The Pied Piper of Hamelin",
          link:
            "http://loverforbooks1.blogspot.com/2012/01/pied-piper-of-hamelin.html",
          source: "loverforbooks1.blogspot.com",
        },
        {
          position: 13,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzjcPoljawbVB-IY4yhiH8ucT_a1Qhvy70oW6z3uO2Oi0M7Q_Kxw&s",
          sourceUrl:
            "https://static.tvtropes.org/pmwiki/pub/images/PiedPiperOfHamelin_1769.jpg",
          title: "The Pied Piper of Hamelin (Literature) - TV Tropes",
          link:
            "https://tvtropes.org/pmwiki/pmwiki.php/Literature/ThePiedPiperOfHamelin",
          source: "tvtropes.org",
        },
        {
          position: 14,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRey6TCf8f3S4KcEbZGMYow2xmbw5MOCR9EZSPBk2EaUctHzr0IZQ&s",
          sourceUrl:
            "https://denverpublicart.org/wp-content/uploads/cache-pictures/c8152f8e67e12d3bd8280325ee407680.jpg",
          title: "The Pied Piper of Hamelin - Denver Public Art",
          link:
            "https://denverpublicart.org/public-arts/the-pied-piper-of-hamelin-3/",
          source: "denverpublicart.org",
        },
        {
          position: 15,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwj0pKUHyPK0eH2K-Q-Rc3FCxwmg5VIM2eZdI-MDSAm5oNOSUcvg&s",
          sourceUrl:
            "https://cdn5.vectorstock.com/i/1000x1000/31/24/pied-piper-of-hamelin-white-vector-24433124.jpg",
          title: "Pied piper of hamelin white",
          link:
            "https://www.vectorstock.com/royalty-free-vector/pied-piper-of-hamelin-white-vector-24433124",
          source: "vectorstock.com",
        },
        {
          position: 16,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV0R7PoiluPuLjrlEsRdqaDfdRRCi_NokbqiwKYWllrshQjFLs&s",
          sourceUrl:
            "https://vignette.wikia.nocookie.net/villains/images/a/a2/Pied_hand.jpg/revision/latest/top-crop/width/360/height/450?cb=20121004214502",
          title: "Pied Piper of Hamelin | Villains Wiki | Fandom",
          link: "https://villains.fandom.com/wiki/Pied_Piper_of_Hamelin",
          source: "villains.fandom.com",
        },
        {
          position: 17,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTBbzGHmMtS_yzo9xrIDvmUpI5VzsBOBLTCgwWnoSnMaw6BgO&s",
          sourceUrl:
            "https://render.fineartamerica.com/images/rendered/default/acrylic-print/10/7.5/hangingwire/break/images/artworkimages/medium/1/pied-piper-rats-andy-catling.jpg",
          title: "Pied Piper rats Acrylic Print",
          link:
            "https://fineartamerica.com/featured/pied-piper-rats-andy-catling.html?product=acrylic-print",
          source: "fineartamerica.com",
        },
        {
          position: 18,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwz_WKIe-yafEOvPwh2TjNw6PlFZIgvtY7PbIFqq5Fq58eSc3Rsg&s",
          sourceUrl:
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/d45add85146863.5d72a412db1eb.jpg",
          title: "Pied Piper of Hamelin Picture Book on Behance",
          link:
            "https://www.behance.net/gallery/85146863/Pied-Piper-of-Hamelin-Picture-Book",
          source: "behance.net",
        },
        {
          position: 19,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNTDxpiM78Jleok9okpHntybuqpquCAwu9LK1zn_4Orj6Uf282cg&s",
          sourceUrl:
            "https://dyn1.heritagestatic.com/lf?set=path%5B2%2F1%2F2%2F6%2F3%2F21263549%5D&call=url%5Bfile%3Aproduct.chain%5D",
          title:
            "Arthur Rackham (British Artist and Illustrator, 1867-1939 ...",
          link:
            "https://historical.ha.com/itm/books/original-art/arthur-rackham-british-artist-and-illustrator-1867-1939-the-pied-piper-place-of-creation-not-identified-/a/6212-42025.s",
          source: "historical.ha.com",
        },
        {
          position: 20,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFWRjDmo6XPFuh0igdiPrrdMjXhqyKTyJliYJMlb51RErOH_2Bog&s",
          sourceUrl:
            "https://cdn5.vectorstock.com/i/1000x1000/31/14/pied-piper-of-hamelin-vector-24433114.jpg",
          title: "Pied piper of hamelin",
          link:
            "https://www.vectorstock.com/royalty-free-vector/pied-piper-of-hamelin-vector-24433114",
          source: "vectorstock.com",
        },
        {
          position: 21,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfWbFi45CxVb3v1eOpF6fTTw9YmHKtnGb2BDSnPUlJEvVjR-ow8Q&s",
          sourceUrl:
            "https://external-preview.redd.it/3q5kKnPK36GQLHnMciQq_j2OZb_Vf47tMtS_R_0aCcg.jpg?width=960&crop=smart&auto=webp&s=5ef96df0c1d0357672fcffad11d95a0b846eb888",
          title: 'The Fool Pied Piper", United States, 1909, satirizing ...',
          link:
            "https://www.reddit.com/r/PropagandaPosters/comments/4mioir/the_fool_pied_piper_united_states_1909_satirizing/",
          source: "reddit.com",
        },
        {
          position: 22,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRatrrZZmcI-wDYv5F1qS8xbN03fI2Kovo_W3dBzWn6Ny_dQanX&s",
          sourceUrl:
            "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/04A552154771DCBBCAE5F150994859B9BB5408C8165E8AF01C46BCAB39D2FC8D/scale?aspectRatio=1.78&format=jpeg",
          title: "Watch The Pied Piper | Full movie | Disney+",
          link:
            "https://www.disneyplus.com/en-gb/movies/the-pied-piper/3jNWdoBHVXMm",
          source: "disneyplus.com",
        },
        {
          position: 23,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMsPqumHyoiiyx-xCpmHymlmaVoogBA6eE7wUufeZ9rH345WeK&s",
          sourceUrl:
            "https://www.ancient-origins.net/sites/default/files/field/image/Pied-Piper-of-Hamelin.jpg",
          title: "The Disturbing True Story of the Pied Piper of Hamelin ...",
          link:
            "https://www.ancient-origins.net/myths-legends/disturbing-true-story-pied-piper-hamelin-001969",
          source: "ancient-origins.net",
        },
        {
          position: 24,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjPZdLjYSrUOhMuTSjHfFufmaaOD_W9_c5gmLYweF-BVD8S7kl&s",
          sourceUrl:
            "https://images-na.ssl-images-amazon.com/images/I/51axpNrGVyL._SX377_BO1,204,203,200_.jpg",
          title:
            "The Pied Piper of Hamelin (Traditional Tales: Stories for ...",
          link:
            "https://www.amazon.com/Pied-Piper-Hamelin-Traditional-Tales/dp/0192724231",
          source: "amazon.com",
        },
        {
          position: 25,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk-yHWzWutyy9HGXnGt3Hzdgl3hdEYJNQTni6wlLFsWVCwZA6I&s",
          sourceUrl:
            "https://www.noozhawk.com/images/made/chrootimages/uploads/dc-pied-trump_2400_1638_80_s_c1.jpg",
          title:
            "Daryl Cagle: Donald Trump's Pied Piper Act a Dead End for ...",
          link:
            "https://www.noozhawk.com/article/daryl_cagle_donald_trump_pied_piper_act_dead_end_immigrant_children_2018062",
          source: "noozhawk.com",
        },
        {
          position: 26,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-SNuvZZpBylffqTA1FONPoVm-hE1dJzCmLmFzYgF2TrzU9DpH&s",
          sourceUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Palace_Hotel_Pied_Piper_Mural.jpg/220px-Palace_Hotel_Pied_Piper_Mural.jpg",
          title: "Pied Piper of Hamelin - Wikipedia",
          link: "https://en.wikipedia.org/wiki/Pied_Piper_of_Hamelin",
          source: "en.wikipedia.org",
        },
        {
          position: 27,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_J5wMNIyQFKpIPuH3gVPm9CYtzPxCDHg8TKJyISCNGpdUgrr8&s",
          sourceUrl:
            "https://miro.medium.com/proxy/1*85VpLwp-Nys4-eOV1iZk1Q.jpeg",
          title: "The Pied Piper of Everywhere - Quandoo - Medium",
          link:
            "https://medium.com/quandoo/the-pied-piper-of-everywhere-b8472e36bd5f",
          source: "medium.com",
        },
        {
          position: 28,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThdQYqOx2a61PSlOjt4fZdXGfA8XurDXaSwQFSUMpYrQw9sQN-PA&s",
          sourceUrl: "https://i.ytimg.com/vi/54SosvLnCvU/maxresdefault.jpg",
          title:
            "THE PIED PIPER OF HAMELIN Fairy Tales For Kids | Traditional Story",
          link: "https://www.youtube.com/watch?v=54SosvLnCvU",
          source: "youtube.com",
        },
        {
          position: 29,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdB3OGQrin-DIHDOQxsL9RAgcFSLu6IcL-gV8vWiqkU0b4DGLF&s",
          sourceUrl:
            "https://d23.com/app/uploads/2011/09/Pied-Piper-September-16-1180w-600h-780x440-1440176591.jpg",
          title: "Silly Symphony The Pied Piper Premieres - D23",
          link:
            "https://d23.com/this-day/silly-symphony-the-pied-piper-premieres-2/",
          source: "d23.com",
        },
        {
          position: 30,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIME_bqQDcgqzpfArOw-MqZjgn1wmH8Qf-YGFjJv4Y6FWy3ePjwQ&s",
          sourceUrl:
            "https://ctl.s6img.com/society6/img/EjbwiQBkQ9PqOlGO02Iwkyhqitc/w_1500/posters/18x24/front/~artwork,fw_2719,fh_3620,fy_-62,iw_2717,ih_4535/s6-original-art-uploads/society6/uploads/misc/b7fed84a8f2d4ea39aea8a18465a2c94/~~/the-pied-piper-of-hamelin1803849-posters.jpg",
          title: "The Pied Piper of Hamelin Poster by viktoriusart",
          link:
            "https://society6.com/product/the-pied-piper-of-hamelin1803849_poster",
          source: "society6.com",
        },
        {
          position: 31,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7fPh0KBrr9J7ME6NG8ivgtWJmlJE5J3qsg2iWfFI24C6uGa8T&s",
          sourceUrl:
            "https://vignette.wikia.nocookie.net/silicon-valley/images/c/c9/Logo.png/revision/latest/scale-to-width-down/340?cb=20160530170312",
          title: "Pied Piper (company) | Silicon Valley Wiki | Fandom",
          link: "https://silicon-valley.fandom.com/wiki/Pied_Piper_(company)",
          source: "silicon-valley.fandom.com",
        },
        {
          position: 32,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMATX9Fu5ELla7MkM5BoofjQ_wRD-o6-Houe0JNDpQ42jlw-9GCw&s",
          sourceUrl:
            "http://www.ritztheatreco.org/wp-content/uploads/2019/12/The-Pied-Piper-e1575399246916.jpg",
          title: "The Pied Piper | Ritz Theatre Co. |",
          link: "http://www.ritztheatreco.org/show/the-pied-piper/",
          source: "ritztheatreco.org",
        },
        {
          position: 33,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrMFSxIuLYVUGqvJC4h_WhVHksKB6P6TJz-UOosdAkzJdAEzIC&s",
          sourceUrl:
            "https://img.huffingtonpost.com/asset/57a2b37013000015007c2d92.jpg?ops=scalefit_630_noupscale",
          title: "Understanding Trump, the Pied Piper | HuffPost",
          link:
            "https://www.huffpost.com/entry/understanding-trump-the-pied-piper_b_57a2af83e4b0456cb7e17442",
          source: "huffpost.com",
        },
        {
          position: 34,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ58hgp6HOuooi0kQN-SZXLx7sOUsj7-BU99XDGNfILwXk8gC3Bg&s",
          sourceUrl:
            "https://cdn.shopify.com/s/files/1/0659/6209/products/Pied_Piper_1024x1024.png?v=1552841034",
          title: "Pied Piper",
          link: "https://www.famousafteridie.net/products/pied-piper",
          source: "famousafteridie.net",
        },
        {
          position: 35,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUEUycu6NKpWhSvmrl77K9Vz45fw3DFb4BH9FNX9RjuTm4RFQJ&s",
          sourceUrl:
            "https://princewilliamliving.com/wp-content/uploads/2016/12/Mulan_Promo_4_Small.jpg",
          title: "Pied Piper Theatre's Production of Disney's Mulan, Jr ...",
          link:
            "https://princewilliamliving.com/pied-piper-theatres-production-of-disneys-mulan-jr/",
          source: "princewilliamliving.com",
        },
        {
          position: 36,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5mwnfuRYZ0clB5FLhq4dNtPF3sDrpomySq61CdqCK3M-Ve5zXSw&s",
          sourceUrl:
            "http://patriotretort.com/wp-content/uploads/2017/05/Pied-Piper-of-Fake-News.jpg",
          title: "The Pied Piper of Fake News - PatriotRetort.com",
          link: "http://patriotretort.com/pied-piper-fake-news/",
          source: "patriotretort.com",
        },
        {
          position: 37,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6SNdlkkhmtWBQLdRE82t_JKj6PJbFxqvPeP2bPpt_WISDoZDg&s",
          sourceUrl:
            "http://1.bp.blogspot.com/_bxVZ7GvshNg/SuXrJFGd4BI/AAAAAAAABzE/7OvC_-HDQ78/s320/Pied+Piper+3.jpg",
          title: "Disney Film Project: The Pied Piper",
          link: "http://www.disneyfilmproject.com/2009/10/pied-piper.html",
          source: "disneyfilmproject.com",
        },
        {
          position: 38,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH6lOxSoaL7e4R2tWaa6u3iMM8b1zrzZnQjKyryGG3m6L7RmLNcA&s",
          sourceUrl:
            "https://pbs.twimg.com/profile_images/1005867403803324416/zX3F2Mar.jpg",
          title: "Pied Piper (@piedpiperplc) | Twitter",
          link: "https://twitter.com/piedpiperplc",
          source: "twitter.com",
        },
        {
          position: 39,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwt-9f2dLww-2FabTF107vlGAYAh60i969K-lXYx7-Kt1J01Xzpw&s",
          sourceUrl:
            "https://c8.alamy.com/comp/BGW0BD/after-hamelin-refused-to-pay-what-the-pied-piper-asked-for-ridding-BGW0BD.jpg",
          title:
            "After Hamelin refused to pay what the Pied Piper asked for ...",
          link:
            "https://www.alamy.com/stock-photo-after-hamelin-refused-to-pay-what-the-pied-piper-asked-for-ridding-27593985.html",
          source: "alamy.com",
        },
        {
          position: 40,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSamd33jkWiiyYBfgwxWxeOKYEla_q_rFS6oPYgqbuaVO6HJu2jag&s",
          sourceUrl:
            "https://rochester.kidsoutandabout.com/sites/default/files/styles/650_scaled/public/Pied%20Piper.jpg?itok=Nv1SX4MA",
          title: "The Pied Piper | Kids Out and About Rochester",
          link: "https://rochester.kidsoutandabout.com/content/pied-piper",
          source: "rochester.kidsoutandabout.com",
        },
        {
          position: 41,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1QKpEHsqd957lfRjE75vO75zoLo__BdPeU0AyHKtlcUPNBriYqg&s",
          sourceUrl:
            "https://miro.medium.com/max/324/1*_RVfI6h5r4S3yjSQ5kNpPQ.jpeg",
          title: "Did the Pied Piper lure hundreds of children to their death?",
          link:
            "https://medium.com/@siobhan.oshea/did-the-pied-piper-lure-hundreds-of-children-to-their-death-34d85b42c74a",
          source: "medium.com",
        },
        {
          position: 42,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0A7OiJRF4t4fSU7UxcZc3CTEaOCkrPow5T8DxjLhsi9HprYOp&s",
          sourceUrl:
            "https://www.scmagazine.com/wp-content/uploads/sites/2/2018/11/PiedPiper.jpg",
          title:
            "Pied Piper phishing infects with FlawedAmmyy, RMS RATs | SC ...",
          link:
            "https://www.scmagazine.com/home/security-news/pied-piper-phishing-scheme-infests-victims-with-flawedammyy-rms-rats/",
          source: "scmagazine.com",
        },
        {
          position: 43,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqjSHWseIbpB75z-cOKJ0CM97uTqJpGq8DARgC0Hli7Vm04l4hZg&s",
          sourceUrl:
            "https://i.pinimg.com/originals/77/23/3d/77233d59329bedccec2f76c445385050.jpg",
          title:
            "The Pied Piper of Hamelin. This creepy German poem teaches a ...",
          link: "https://www.pinterest.com/pin/289426713523685612/",
          source: "pinterest.com",
        },
        {
          position: 44,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr1BAEDRwn-wjA8pzoPQ9ToVX4aBhtmF74QhHfK9ty7dN-nmyUEw&s",
          sourceUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rats_of_Hamelin.jpg/220px-Rats_of_Hamelin.jpg",
          title: "Pied Piper of Hamelin - Wikipedia",
          link: "https://en.wikipedia.org/wiki/Pied_Piper_of_Hamelin",
          source: "en.wikipedia.org",
        },
        {
          position: 45,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwPCGomiDi9BowKBnYZwVdKWeUBvVXPYT4W9_Ekr8fHBc2FdfH&s",
          sourceUrl: "https://cake.imgix.net/m/Rvpdgxc99ymk_1523293660025.jpeg",
          title: "HBO Silicon Valley - Pied Piper Logo Redesign - Cake",
          link:
            "https://www.cake.co/conversations/pzZTVTq/hbo-silicon-valley---piped-piper-logo-redesign",
          source: "cake.co",
        },
        {
          position: 46,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS8tJCL8fsZ1swirD1lCH9BRt4Cmc0Q1l1zKFec9sAa-qvCS3Q&s",
          sourceUrl:
            "https://m.media-amazon.com/images/M/MV5BZDBiYWUyNDYtODMzNi00OTljLThjZjYtZjEzNDlhYWE5OWZiXkEyXkFqcGdeQXVyNTkxMzEwMzU@._V1_.jpg",
          title: "The Pied Piper (1972) - IMDb",
          link: "https://www.imdb.com/title/tt0069086/",
          source: "imdb.com",
        },
        {
          position: 47,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcPinIIMV60NVCgHfiNNFZeLQPipCZAVVX8JdrpgjJCIYg9m9Y&s",
          sourceUrl:
            "https://www.boxoutbullying.com/wp-content/uploads/2016/02/Screen-Shot-2016-02-07-at-4.26.43-PM.jpg",
          title: "The Story Of The Pied Piper Of Hamelin - 9 of 52",
          link:
            "https://www.boxoutbullying.com/the-story-of-the-pied-piper-of-hamelin-10-of-52/",
          source: "boxoutbullying.com",
        },
        {
          position: 48,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLFFP2NlV35Py7_Dc-l72LOw6mtmT4q5o1rGA2SM8kARiW6pli_g&s",
          sourceUrl:
            "https://images-na.ssl-images-amazon.com/images/I/91XF8e6PeEL.jpg",
          title: "The Pied Piper of Hamelin: Morpurgo, Michael, Chichester ...",
          link:
            "https://www.amazon.com/Pied-Piper-Hamelin-Michael-Morpurgo/dp/0763648248",
          source: "amazon.com",
        },
        {
          position: 49,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROc2sSUdI2dVLVrW21bqRTKw9Uey07RFLG_7jCxkUWOr0Q31ZNeg&s",
          sourceUrl:
            "https://comicvine1.cbsistatic.com/uploads/scale_medium/10/100647/3836632-piedpiper.jpg",
          title: "Pied Piper (Character) - Comic Vine",
          link: "https://comicvine.gamespot.com/pied-piper/4005-10472/",
          source: "comicvine.gamespot.com",
        },
        {
          position: 50,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5XTYYJrLFI_nqH8-BRjmONYwgiWmhpH7-3KxCapYSSZPHQy9GvQ&s",
          sourceUrl:
            "https://media.spokesman.com/photos/2011/06/02/Palin-Pied-Piper_t810.jpg?043915c051a7e8a61f3dafe8e38e28c2ebfb384b",
          title: "The Pied Piper of Wasilla... | The Spokesman-Review",
          link:
            "https://www.spokesman.com/blogs/commcomm/2011/jun/02/pied-piper-wasilla/",
          source: "spokesman.com",
        },
        {
          position: 51,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFs9KXsPwoNr-39-w9iLM1Pa5cDt1tcIFdzGkRbER8TjOy1w_3uA&s",
          sourceUrl:
            "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=912405708903887",
          title: "Trump The Pied Piper of Dog Whistling Rats - Home | Facebook",
          link: "https://www.facebook.com/TrumpThePiedPiperofDogWhistlingRats/",
          source: "facebook.com",
        },
        {
          position: 52,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7xWZmfjWZzKuwPC8tY1A5VMVOXQL6HB1bqlKxU_46tnmWFOR7&s",
          sourceUrl:
            "https://image.shutterstock.com/image-illustration/illustration-pied-piper-hamelin-600w-1132086932.jpg",
          title:
            "Illustration Pied Piper Hamelin Stock Illustration 1132086932",
          link:
            "https://www.shutterstock.com/image-illustration/illustration-pied-piper-hamelin-1132086932",
          source: "shutterstock.com",
        },
        {
          position: 53,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF5aLcbpxESbjXmDUaDLWs0Acc7vjC5o7wVSY4IF3lwElyZgua&s",
          sourceUrl:
            "https://www.noozhawk.com/images/made/chrootimages/uploads/dc-pied-trump2_750_517_80_c1.jpg",
          title:
            "Daryl Cagle: Donald Trump's Pied Piper Act a Dead End for ...",
          link:
            "https://www.noozhawk.com/article/daryl_cagle_donald_trump_pied_piper_act_dead_end_immigrant_children_2018062",
          source: "noozhawk.com",
        },
        {
          position: 54,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC7hp_Y8nRyZZ0aGZnCdWv_Rxn5sgIWr49i3rfrWe9GWpYBTwojA&s",
          sourceUrl:
            "http://ids.si.edu/ids/deliveryService?id=NMAH-JN2018-00943-000001&max=1000",
          title:
            "Follow the Pied Piper Join the United States School Garden ...",
          link:
            "https://americanhistory.si.edu/collections/search/object/nmah_540056",
          source: "americanhistory.si.edu",
        },
        {
          position: 55,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaPaA7K8LV35AJ_BS5Ltyjbv8isnwgYXNgpcQJVDUZSlkdSqfkVA&s",
          sourceUrl:
            "https://archive.org/download/ObamaThePiedPiperOfWashington/ObamaThePiedPiperOfWashington.gif",
          title:
            "Obama The Pied Piper of Washington : Latuff : Free Download ...",
          link: "https://archive.org/details/ObamaThePiedPiperOfWashington",
          source: "archive.org",
        },
        {
          position: 56,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKxxGOWbuFjYGTmFM3qOBQczInqfhqYm_TpwbjAikolbKjzAHq&s",
          sourceUrl:
            "https://www.aitrends.com/wp-content/uploads/2017/05/5-16PiedPiper-2.jpg",
          title:
            "Pied Piper Approach to Car-Following with Self-Driving Cars ...",
          link:
            "https://www.aitrends.com/ai-insider/pied-piper-approach-car-following-self-driving-cars/",
          source: "aitrends.com",
        },
        {
          position: 57,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgWIMTxElbmn5wQdUrmrk_d5AQr8Sej70MteCWkY3YiL9WHE7P&s",
          sourceUrl:
            "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1600347156949652",
          title:
            "Pied Piper - Silicon Valley - Computer Company - 14 Photos ...",
          link: "https://www.facebook.com/ppsiliconvalley/",
          source: "facebook.com",
        },
        {
          position: 58,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0EGlt-GVLz12952QhJ5nmI-fO1EvF-pzst_NhQRga_YBiw_FZ&s",
          sourceUrl:
            "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1333748557i/107315._UY475_SS475_.jpg",
          title: "Pied Piper by Nevil Shute",
          link: "https://www.goodreads.com/book/show/107315.Pied_Piper",
          source: "goodreads.com",
        },
        {
          position: 59,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiEn6m__2w_7mfk1VP6kfPqYe2L55wmC5RGv7h728t_5G4w1Zj&s",
          sourceUrl:
            "https://folklorethursday.com/wp-content/uploads/2019/06/piedpiper.png",
          title: "A Pied Piper Mystery - #FolkloreThursday",
          link: "https://folklorethursday.com/folktales/a-pied-piper-mystery/",
          source: "folklorethursday.com",
        },
        {
          position: 60,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPlt6n1mNwHHRj-aJpHnpr-DBByjOFL3MvxGnpIHPMU_4nMd_p2Q&s",
          sourceUrl:
            "https://www.wfmt.com/wp-content/uploads/2018/02/pied-piper-of-hamelin-stained-glass-panel-e1522265265938.jpg",
          title: "Hamelin, Year 1284: The Real Pied Piper? | WFMT",
          link:
            "https://www.wfmt.com/2018/03/07/hamelin-year-1284-real-pied-piper/",
          source: "wfmt.com",
        },
        {
          position: 61,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd0sUN1qFvhBDbSX-SPSoRXQqZoPeKxLr0FKpoLNJBu7OjgZS3&s",
          sourceUrl:
            "https://target.scene7.com/is/image/Target/GUEST_c859ae35-b7c2-4ce4-ad71-9ea91cdb9f78?wid=488&hei=488&fmt=pjpeg",
          title: "The Pied Piper of Hamelin - by Robert Browning (Paperback)",
          link:
            "https://www.target.com/p/the-pied-piper-of-hamelin-by-robert-browning-paperback/-/A-79287060",
          source: "target.com",
        },
        {
          position: 62,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQviX8NUKSDHelAEBYf4VD50jhH-xGlqi3m_dr8Ngu4l453ci34jQ&s",
          sourceUrl:
            "https://cdn.shopify.com/s/files/1/0262/2091/products/pied-piper-silicon-valley-tshirt-detail_large@2x.png?v=1571328869",
          title: "Pied Piper | tshirtsthatsuck",
          link: "https://www.tshirtsthatsuck.com/products/pied-piper",
          source: "tshirtsthatsuck.com",
        },
        {
          position: 63,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTnCNsRxUnxC6OhlYMafLhKnIqXBQBQ3Z6AVRjOpUMvo6VeYh6&s",
          sourceUrl: "https://www.hyperborea.org/flash/bigimages/piper1.jpg",
          title: "Pied Piper (Flash Comics)",
          link: "https://www.hyperborea.org/flash/piper.html",
          source: "hyperborea.org",
        },
        {
          position: 64,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kLi1A9ky5NpjkmFX7ETVcVbfhDM7NSPc5HcMRSIUgdlVyw-u&s",
          sourceUrl:
            "https://previews.123rf.com/images/pavlematic/pavlematic1806/pavlematic180600093/104460021-pied-piper-of-hamelin-cartoon.jpg",
          title: "Pied piper of Hamelin cartoon",
          link:
            "https://www.123rf.com/photo_104460021_stock-vector-pied-piper-of-hamelin-cartoon.html",
          source: "123rf.com",
        },
        {
          position: 65,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLuWajHbzlrBHEJT83yc70Il5YHXOWmqMRJyl8YJFTN_IkZHTLQ&s",
          sourceUrl:
            "https://www.interstacks.com/wp-content/uploads/2018/07/pied_piper_logo.png",
          title: "Pied Piper and the Distributed Internet - Interstacks",
          link:
            "https://www.interstacks.com/blog/pied-piper-and-the-distributed-internet/",
          source: "interstacks.com",
        },
        {
          position: 66,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNKoCZsw9_TL3NnBfuy3gPABGXfz9gWwRF5uPuDilYgv7jVXto&s",
          sourceUrl:
            "https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Pied_Piper_%28Hartley_Rathaway_-_circa_2002%29.png/200px-Pied_Piper_%28Hartley_Rathaway_-_circa_2002%29.png",
          title: "Pied Piper (comics) - Wikipedia",
          link: "https://en.wikipedia.org/wiki/Pied_Piper_(comics)",
          source: "en.wikipedia.org",
        },
        {
          position: 67,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCcIuEYNYpswa1vGlxC1FSCE2PN38bGb5B82RhroGMOBPLVMA8NQ&s",
          sourceUrl:
            "https://edu-clips.com/wp-content/uploads/2018/09/the-pied-piper.jpg",
          title: "The Pied Piper Clip Art Set",
          link: "https://edu-clips.com/product/the-pied-piper-clip-art-set/",
          source: "edu-clips.com",
        },
        {
          position: 68,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8sJSTMmj2W7JU7b5tCWD2Q9WJlyrAM3QQh-czYTtXAcIIP7WFGg&s",
          sourceUrl:
            "https://www.kinolorber.com/media_cache/images/full/pied%20piper%20dvd.jpg",
          title: "The Pied Piper - Kino Lorber Theatrical",
          link: "https://www.kinolorber.com/film/view/id/2621",
          source: "kinolorber.com",
        },
        {
          position: 69,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlqlYzPvU2dgwM2sVA-dER4AxGtq6FGNa86pbRym6uIJ2Rzsxtjw&s",
          sourceUrl:
            "https://img.discogs.com/M9xfupJBRknycuK6nBTneiohOQ0=/fit-in/600x507/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12480323-1536195870-7118.png.jpg",
          title: "Donovan - Pied Piper (2002, CD) | Discogs",
          link: "https://www.discogs.com/Donovan-Pied-Piper/release/12480323",
          source: "discogs.com",
        },
        {
          position: 70,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScMPNK5WMhlDmPW0lWzPP70EoPrYURbFNUs3F-aAG_jKYHxWIM&s",
          sourceUrl: "https://i.ytimg.com/vi/A0cKyA5U4jY/maxresdefault.jpg",
          title:
            "BTS Pied Piper REAL Meaning Explained: Lyrics and Fairy Tale Analysis (BTS  Theory)",
          link: "https://www.youtube.com/watch?v=A0cKyA5U4jY",
          source: "youtube.com",
        },
        {
          position: 71,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabuezycCGizQ_ljKSzY6wDhhYvipCot1YDicpoXu7172uZef_&s",
          sourceUrl:
            "https://kbimages1-a.akamaihd.net/370d2cef-044b-41a6-b42a-c3be6d907ed0/1200/1200/False/level-4-the-pied-piper-of-hamelin.jpg",
          title:
            "Level 4: The Pied Piper of Hamelin ebook by Marie Crook - Rakuten Kobo",
          link:
            "https://www.kobo.com/us/en/ebook/level-4-the-pied-piper-of-hamelin",
          source: "kobo.com",
        },
        {
          position: 72,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOif3-yXig4itNfDQ-YhH8iZMf8UUhcTiy5tD_YDlIgQXSt63OSA&s",
          sourceUrl:
            "https://m.media-amazon.com/images/M/MV5BODI4NDg4MDkzOF5BMl5BanBnXkFtZTgwNDAxMzgzNzE@._V1_UY1200_CR84,0,630,1200_AL_.jpg",
          title: "The Pied Piper of Hamelin (TV Movie 1957) - IMDb",
          link: "https://www.imdb.com/title/tt0050842/",
          source: "imdb.com",
        },
        {
          position: 73,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHk73zVGMEYYIyaDUoNuzx1g3JKKIQTLE4GCceZ-NW3ycDLvbLgQ&s",
          sourceUrl:
            "https://s3-ap-southeast-2.amazonaws.com/fna-wordpress-website14/wp-content/uploads/2016/12/16125109/663-251x145.jpg",
          title: "Pied Piper Lures 130 Children of Hamelin Away | History ...",
          link:
            "https://www.historychannel.com.au/this-day-in-history/pied-piper-lures-130-children-of-hamelin-away/",
          source: "historychannel.com.au",
        },
        {
          position: 74,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThnAdd23lOuKbkoG3ZhR3Ms_XeNQZ5xhtTsaJ7JejkdLC8Vm6uhA&s",
          sourceUrl:
            "https://images-na.ssl-images-amazon.com/images/I/51AZEmX3x0L._SX331_BO1,204,203,200_.jpg",
          title: "The Pied Piper of Hamelin: Illustrated: Browning, Robert ...",
          link:
            "https://www.amazon.com/Pied-Piper-Hamelin-Illustrated/dp/1518837026",
          source: "amazon.com",
        },
        {
          position: 75,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJLFp97ICISYEn-FUZjChTFWNJ1DZGoJFlveKD3aSSwkMHi35K&s",
          sourceUrl: "https://d23.com/app/uploads/2015/07/pied-piper.jpg",
          title: "Pied Piper, The (film) - D23",
          link: "https://d23.com/a-to-z/pied-piper-the-film/",
          source: "d23.com",
        },
        {
          position: 76,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQjSTMXQzsqDFGh0wolx2Ssua6pNYgjsbVIIPCsiomzX76_ot&s",
          sourceUrl:
            "https://www.dramanotebook.com/wp-content/uploads/2019/11/DN-Pied-Piper.jpg",
          title: "The Pied Piper Play Script for Kids and Teens",
          link: "https://www.dramanotebook.com/plays-for-kids/the-pied-piper/",
          source: "dramanotebook.com",
        },
        {
          position: 77,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnAuDUMWtoiWab7_wanTDZMlrWwuIj6sC60s_VyQ3f_pPZorDw&s",
          sourceUrl:
            "https://vignette.wikia.nocookie.net/dcanimated/images/c/cd/Pied_Piper.png/revision/latest/top-crop/width/360/height/450?cb=20130305212715",
          title: "Pied Piper | DC Animated Universe | Fandom",
          link: "https://dcau.fandom.com/wiki/Pied_Piper",
          source: "dcau.fandom.com",
        },
        {
          position: 78,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cDiWMFv9z9E1d9ljRh4v9Gk8I-89qUKDZz9Vqwv3lLngNuvk9g&s",
          sourceUrl:
            "https://germangirlinamerica.com/wp-content/uploads/2018/07/hamelin.jpg",
          title:
            "The Pied Piper of Hamelin Story-800 Year Mystery Wrapped in ...",
          link: "https://germangirlinamerica.com/pied-piper-hamelin-story/",
          source: "germangirlinamerica.com",
        },
        {
          position: 79,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-OEdANH7Zhpx-jExeMJFCKTb2M4A7p3BiAxwXqYtOKCIB-fPcKw&s",
          sourceUrl:
            "https://cdn.shopify.com/s/files/1/0006/6060/2935/products/silhoihatpp01_87e1a1c9-b0b4-497a-9100-f51cb48c6fe4_530x@2x.jpg?v=1528443769",
          title: "Pied Piper Logo Hat from Silicon Valley",
          link:
            "https://shop.hbo.com/products/silicon-valley-pied-piper-logo-hat",
          source: "shop.hbo.com",
        },
        {
          position: 80,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeta7gJAPuAdplblFynmc0sO_Btngxm0qTuzSQVSeZJEZQUu3MBA&s",
          sourceUrl:
            "https://c8.alamy.com/comp/ANHTEC/the-pied-piper-of-hamelin-ANHTEC.jpg",
          title: "The Pied Piper Of Hamelin Stock Photo: 5072107 - Alamy",
          link:
            "https://www.alamy.com/the-pied-piper-of-hamelin-image5072107.html",
          source: "alamy.com",
        },
        {
          position: 81,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThsOVQAXAK93dL2cEA8QGqSkVlsVnpMUmjc6yyBsBNjuFo8jPe8w&s",
          sourceUrl:
            "https://lh3.googleusercontent.com/-VXtsh3GlEdI/XA9iTZ1k87I/AAAAAAABaBs/sdr3qXycM24D7mGto6fOv91clqKa_pIoQCHMYCw/pied-piper-hamelin-93?imgmax=1600",
          title:
            "The True Story Behind 'The Pied Piper of Hamelin' | Amusing ...",
          link:
            "https://www.amusingplanet.com/2018/12/the-true-story-behind-pied-piper-of.html",
          source: "amusingplanet.com",
        },
        {
          position: 82,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqVSlnMGl9jzu5mnaybbwX7VusEgPZyGaPSaovGJjeDKNWwBV0&s",
          sourceUrl:
            "https://render.fineartamerica.com/images/rendered/default/flatrolled/yoga-mat/images/artworkimages/medium/1/the-pied-piper-kate-greenaway.jpg?&targetx=0&targety=-547&imagewidth=1320&imageheight=1534&modelwidth=1320&modelheight=440&backgroundcolor=E2E2CD&orientation=1&producttype=yogamat",
          title: "The Pied Piper Yoga Mat",
          link:
            "https://pixels.com/featured/the-pied-piper-kate-greenaway.html?product=yoga-mat",
          source: "pixels.com",
        },
        {
          position: 83,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa-RGyyv36p246PG-C0mzJ5vKb5SzRERh_MYOG7oUM0bc3M87H&s",
          sourceUrl:
            "https://dyn1.heritagestatic.com/lf?set=path%5B6%2F0%2F9%2F4%2F6094935%5D&call=url%5Bfile%3Aproduct.chain%5D",
          title: "Carl Barks The Pied Piper Painting Original Art (1978 ...",
          link:
            "https://comics.ha.com/itm/original-comic-art/paintings/carl-barks-the-pied-piper-painting-original-art-1978-/a/7027-92037.s",
          source: "comics.ha.com",
        },
        {
          position: 84,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3xQ8MWgk3a5B5_OCLhFoNebLberxqmwfARj03Ma6E4Zqi77s&s",
          sourceUrl:
            "https://ems-media-prod.s3.amazonaws.com/styles/clio_aotw_ems_image_details_retina/s3/tb/CLIO/classic/media/2012/print/jpg/201201011_1.jpg?itok=6o18o3Ym",
          title: "The Pied Piper of Hamelin | Clios",
          link: "https://clios.com/awards/winner/7053",
          source: "clios.com",
        },
        {
          position: 85,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcT538yxDgeizoThNmCmcTwQy6g6AJaA4cvWgyTHfx3US9wF5kVw&s",
          sourceUrl:
            "https://todaytix.imgix.net/prod_1578412573909_pied_prod.jpg",
          title: "The Pied Piper Tickets | Washington DC | TodayTix",
          link:
            "https://www.todaytix.com/x/washington-dc/shows/20576-the-pied-piper",
          source: "todaytix.com",
        },
        {
          position: 86,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmF49F1IHtqqxEJ8e2S5zdH93aFnJvtxcCZfpL-ttcNfOcKMAk&s",
          sourceUrl:
            "https://www.piedpipersf.com/resourcefiles/home-middle-slider-image/mural-good-quality.jpg?version=5072020093943",
          title: "Welcome | Pied Piper at the Palace Hotel, San Francisco",
          link: "https://www.piedpipersf.com/",
          source: "piedpipersf.com",
        },
        {
          position: 87,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf5h8U7VTBTOAOAZv5l5lddGuO80-nI504VhPt5ew5BNkRG8mQlQ&s",
          sourceUrl:
            "https://cdn.shopify.com/s/files/1/0842/8325/products/file4-24_2048x.jpeg?v=1545180291",
          title: "The Pied Piper Of Hamelin",
          link:
            "https://redbarncollections.com/products/the-pied-piper-of-hamelin",
          source: "redbarncollections.com",
        },
        {
          position: 88,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqrW-vNSuBAGJDBc0NtoiSSgEx0qfhMYXSBZtMb7qHsllcldR4qQ&s",
          sourceUrl:
            "https://bloximages.chicago2.vip.townnews.com/insidenova.com/content/tncms/assets/v3/editorial/6/27/6272e23e-71da-11e9-8564-0780296f5baa/5cd34d9e034b9.image.jpg?resize=1200%2C961",
          title:
            "Pied Piper Theatre presents 'Annie' May 11-12 | Performing ...",
          link:
            "https://www.insidenova.com/performing_arts/pied-piper-theatre-presents-annie-may-11-12/article_09d842f4-71da-11e9-9d42-b72ac311160b.html",
          source: "insidenova.com",
        },
        {
          position: 89,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz5LOtmZAJK1oQ3OTl40-hE4aM5kG5GpN06OVx-aNfpKph-vzB&s",
          sourceUrl:
            "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/2/9/1423491770266/1d4d8b2a-0964-4fb7-bd49-bd86738d46fb-2060x1236.jpeg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctcmV2aWV3LTQucG5n&s=d863fdd9edc08717719db3afcbad96cd",
          title: "The Pied Piper of Hamelin review – Matthews's tale is ...",
          link:
            "https://www.theguardian.com/music/2015/feb/09/pied-piper-of-hamelin-colin-matthews-lpo-jurowski-review",
          source: "theguardian.com",
        },
        {
          position: 90,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-w_EuSELzY2W2vph5wLJxu69Xp2_TYGN_nMin-Di7pJhyDDVdmg&s",
          sourceUrl:
            "https://render.fineartamerica.com/images/rendered/default/print/7/8/break/images/artworkimages/medium/1/the-pied-piper-kate-greenaway.jpg",
          title: "The Pied Piper Art Print",
          link:
            "https://fineartamerica.com/featured/the-pied-piper-kate-greenaway.html?product=art-print",
          source: "fineartamerica.com",
        },
        {
          position: 91,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWL5lbeGILPkheBDL8U71DLLF-DLzf7Fu7W5P6xGnbzUioYA-VXg&s",
          sourceUrl: "https://media.glassdoor.com/l/db/d2/78/09/pied-piper.jpg",
          title:
            "Pied Piper... - Pied Piper Pest Control Office Photo | Glassdoor",
          link:
            "https://www.glassdoor.com/Photos/Pied-Piper-Pest-Control-Office-Photos-IMG872308.htm",
          source: "glassdoor.com",
        },
        {
          position: 92,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStyibZ-d8wvaU3rTkLxQ6WiA0-doNTu_p33zoQB6YB7VjeZKin&s",
          sourceUrl:
            "https://www.wired.com/wp-content/uploads/2016/04/silicon15_02-1200x630-e1460756107751.jpg",
          title:
            "Silicon Valley Deleted Scene: Pied Piper Won't Throw Down ...",
          link:
            "https://www.wired.com/2016/04/silicon-valley-season-2-deleted-scene/",
          source: "wired.com",
        },
        {
          position: 93,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPQsNKXT9igtQRpqD5QBe465FbrjchPUj4zxFGS1Tk1CYz89SV&s",
          sourceUrl:
            "https://image.shutterstock.com/image-vector/hamelin-pied-piper-man-plays-600w-600865331.jpg",
          title:
            "Hamelin Pied Piper Man Plays Pipe Stock Vector (Royalty Free ...",
          link:
            "https://www.shutterstock.com/image-vector/hamelin-pied-piper-man-plays-pipe-600865331",
          source: "shutterstock.com",
        },
        {
          position: 94,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7s5gGNxooRlFV8ust6dm-MAy3jolCu--duuZtviiigOWbEzDxlA&s",
          sourceUrl:
            "https://lowres.cartooncollections.com/the_pied_piper_of_hamelin-legends-fairy_tales-rat_catchers-rats-animals-CX903893_low.jpg",
          title: "The Pied Piper Of Hamelin Cartoons and Comics - funny ...",
          link:
            "https://www.cartoonstock.com/directory/t/the_pied_piper_of_hamelin.asp",
          source: "cartoonstock.com",
        },
        {
          position: 95,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGoeJdU1Bc-lh45qq8mrl-Zi_2RwIaWDxD0DkwEzxWVY9gH557&s",
          sourceUrl:
            "https://upload.wikimedia.org/wikipedia/commons/6/69/Page_31_The_Pied_Piper_of_Hamelin_1888_taken_by_MystinaRose%2C_small_feet_pattering%2C_with_wooden_shoes_clattering._Mommy_%26_Son._Green_dress_and_blue_outfit_with_bonnets.png",
          title: "File:Page 31 The Pied Piper of Hamelin 1888 taken by ...",
          link:
            "https://commons.wikimedia.org/wiki/File:Page_31_The_Pied_Piper_of_Hamelin_1888_taken_by_MystinaRose,_small_feet_pattering,_with_wooden_shoes_clattering._Mommy_%26_Son._Green_dress_and_blue_outfit_with_bonnets.png",
          source: "commons.wikimedia.org",
        },
        {
          position: 96,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIgNM-yvIod5fQy_cgkN5T2hqjRoCAM2inD2GVusB1M53B21cJlA&s",
          sourceUrl:
            "https://b3h2.scene7.com/is/image/BedBathandBeyond/77920546087522p?$690$&wid=690&hei=690",
          title:
            "Pied Piper Creative Starfish Photo Collage Canvas Wall Art ...",
          link:
            "https://www.buybuybaby.com/store/product/pied-piper-creative-starfish-photo-collage-canvas-wall-art/1046087522",
          source: "buybuybaby.com",
        },
        {
          position: 97,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtZES_L0166Fe97Gzs053xXB1wjqo9J-jiCiQTvfAtk5VJ1kP6VA&s",
          sourceUrl:
            "https://i.pinimg.com/originals/04/9d/27/049d27de9a941d93dc193605da823e1c.jpg",
          title:
            "LOVING CHRISTMAS WISHES THE PIED PIPER OF HAMLIN piper walks ...",
          link: "https://www.pinterest.com/pin/414542340674206063/",
          source: "pinterest.com",
        },
        {
          position: 98,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0W2Q_07skMKtVnc9tOfF42nDc7rRHeN4ktLkWd5ZOlgnxhoK0&s",
          sourceUrl:
            "http://harbertmagazine.auburn.edu/wp-content/uploads/2019/12/PiedPiper.jpg",
          title: "The Pied Pipers of Palo Alto",
          link:
            "http://harbertmagazine.auburn.edu/index.php/2019/12/17/the-pied-pipers-of-palo-alto/",
          source: "harbertmagazine.auburn.edu",
        },
        {
          position: 99,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfIlmG5ycqsI2acZPoMMBR48JLh189rK5lPxWxR2B8yzuJuZiu&s",
          sourceUrl:
            "https://ctl.s6img.com/society6/img/FpLYWy_jyWL3dqX38AYZm-yYaJw/w_700/prints/~artwork/s6-0011/a/3269317_4078601/~~/the-pied-piper-of-hamelin-prints.jpg",
          title: "The Pied Piper of Hamelin Art Print by martasan",
          link: "https://society6.com/product/the-pied-piper-of-hamelin_print",
          source: "society6.com",
        },
        {
          position: 100,
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTGzaiSeiemw02_3-SdGxWDmh8kmI8mA6d4k8P3qTQrov-uNyV&s",
          sourceUrl:
            "https://cdn11.bigcommerce.com/s-yzgoj/images/stencil/1280x1280/products/1857139/4143950/MEL10508533__82608.1541831236.jpg?c=2&imbypass=on",
          title:
            "The Pied Piper Of Hamelin Poster Print By Mary Evans Picture Library/Peter  & Dawn Cope Collection - Item # VARMEL10508533",
          link:
            "https://www.posterazzi.com/the-pied-piper-of-hamelin-poster-print-by-mary-evans-picture-library-peter-dawn-cope-collection-item-varmel10508533/",
          source: "posterazzi.com",
        },
      ],
    };
    res.json(body);
  } catch (e) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route POST api/auth
//@desc LOGIN Authenticate user & get token
//@access Public

router.post(
  "/",
  [
    //El check de express validator checa la informacion
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    //Pone los errors en un array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //Si existen errors
      //Status 400 y manda los errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      //See if user exists
      let user = await User.findOne({ email });
      //Si no existe
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: " Invalid Credentials" }] });
      }

      //Check if email and password matches
      const isMatch = await bcrypt.compare(password, user.password);
      //Si no es match
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id, //Object id del user
        },
      };

      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: 560000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      // console.error(err.message);
      res.status(400).send("Server error");
    }
  }
);

module.exports = router;
