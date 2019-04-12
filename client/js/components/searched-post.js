Vue.component("searched-post",{
    props: ['search-on-screen', 'show-search', "found-post"],
    data() {
        return {
            found: []
        }
    },
    create() {
        
    },
    template: `
    <div class="container">
        <div class="row">
            <div class="mx-auto">
                <h4 class="text-dark mb-5 mt-2" v-if="showSearch">{{ searchOnScreen }}</h4>
            </div>
        </div>
        <div class="grid" v-for="post in foundPost">
        <div>
        <figure class="effect-milo">
            <img :src="post.post"
                alt="img11" />
            <figcaption>
                <div class="fb-share-button fb-config"
                    :data-href="post.post"
                    data-layout="button_count">
                </div>

                <h2><span>{{ post.title }}</span></h2>
                    <p class="high" v-for="tag in post.tags">{{ tag.tagName  }}</p>
                <a href="#">View more</a>
            </figcaption>
        </figure>
        </div>
        </div>
    </div>
    `
})