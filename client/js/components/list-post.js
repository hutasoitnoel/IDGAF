Vue.component("list-post",{
    data() {
        return {
            posts: []
        }
    },
    props: [],
    created() {
        axios
            .get('http://localhost:3000/posts')
            .then(allpost => {
                this.posts = allpost.data
            })
            .catch(err => {
                console.log(err)
            })

    },
    template: `
    <div class="container">
    <div class="grid" v-for="post in posts">
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