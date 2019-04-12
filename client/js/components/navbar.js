Vue.component("navbar-template",{
    data() {
        return {
            search: ''
        }
    },
    methods: {
        move(position) {
            this.$emit('move', position)
        },
        submit() {
            console.log('masok')
            this.$emit('submit', this.search)
        }
    },
    template: `
        <nav id="navbar-template" class="navbar navbar-light fixed-top bg-dark">
            <div class="flex">
                <a href class="navbar-brand text-light logo" @click.prevent="move('list-post')">IDGAF</a>
                <form id="search-bar" class="form" @submit.prevent="submit">
                    <input 
                        class="form-control search-bar mr-sm-2" 
                        type="search" 
                        placeholder="Search"
                        aria-label="Search"
                        v-model="search"
                    >

                </form>
            </div>

            <div class="actions">
                <a href @click.prevent="">
                    <i class="fas fa-user fa-lg navbar-nav right"></i>
                </a>
                <a href @click.prevent="move('add-post')">
                    <i class="fas fa-plus fa-lg navbar-nav right"></i>
                </a>
                <a href @click.prevent="">
                    <i class="fas fa-power-off fa-lg navbar-nav"></i>
                </a>
            </div>
        </nav>
    `
})