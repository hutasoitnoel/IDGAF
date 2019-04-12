Vue.component("searched-post",{
    props: ['search-on-screen', 'show-search'],
    template: `
    <div class="container">
        <div class="row">
            <div class="mx-auto">
                <h4 class="text-light mb-5 mt-2" v-if="showSearch">{{ searchOnScreen }}</h4>
            </div>
        </div>
        <div class="grid">
            <figure class="effect-milo">
                <img src="https://media3.giphy.com/media/SggILpMXO7Xt6/giphy.gif?cid=790b76115caff44258592e5832098a3f"
                    alt="img11" />
                <figcaption>
                    <div class="fb-share-button fb-config"
                        data-href="https://media3.giphy.com/media/SggILpMXO7Xt6/giphy.gif?cid=790b76115caff44258592e5832098a3f"
                        data-layout="button_count">
                    </div>

                    <h2><span>anjing</span></h2>
                        <p class="high">#happy #sad #funny #dog</p>
                    <a href="#">View more</a>
                </figcaption>
            </figure>
            <figure class="effect-milo">
                <img src="https://media3.giphy.com/media/SggILpMXO7Xt6/giphy.gif?cid=790b76115caff44258592e5832098a3f"
                    alt="img11" />
                <figcaption>
                    <div class="fb-share-button fb-config"
                        data-href="https://media3.giphy.com/media/SggILpMXO7Xt6/giphy.gif?cid=790b76115caff44258592e5832098a3f"
                        data-layout="button_count">
                    </div>

                    <h2><span>anjing</span></h2>
                        <p class="high">#happy #sad #funny #dog</p>
                    <a href="#">View more</a>
                </figcaption>
            </figure>
            <figure class="effect-milo">
                <img src="https://media3.giphy.com/media/SggILpMXO7Xt6/giphy.gif?cid=790b76115caff44258592e5832098a3f"
                    alt="img11" />
                <figcaption>
                    <div class="fb-share-button fb-config"
                        data-href="https://media3.giphy.com/media/SggILpMXO7Xt6/giphy.gif?cid=790b76115caff44258592e5832098a3f"
                        data-layout="button_count">
                    </div>

                    <h2><span>anjing</span></h2>
                        <p class="high">#happy #sad #funny #dog</p>
                    <a href="#">View more</a>
                </figcaption>
            </figure>
        </div>
    </div>
    `
})