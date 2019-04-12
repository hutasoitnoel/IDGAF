Vue.component("add-post-form", {
    components: {
        "tags-input": VoerroTagsInput,
        'picture-input': PictureInput
    },
    data() {
        return {
            file: '',
            titleInput: '',
            tagInput: '',
            fileInput: '',
            selectedTags: [],
            existTags: {},
            background: 'https://cdn.dribbble.com/users/122051/screenshots/5749053/dribbble_1.gif',
            tagId: [],
            tagInfo: []
        }
    },
    methods: {
        onChange(image) {
            this.fileInput = image
            const payload = {
                image
            }
            axios.post('http://localhost:3000/tags', payload)
                .then(({ data }) => {
                    let arr = []
                    data.map(e => {
                        console.log(e)
                        this.tagId.push(e._id)
                        arr.push(e.tagName)
                        this.tagInfo.push(e)
                    })
                    // tagsId = tagsId.filter(tag => 
                    //     selectedTags.find(selected => 
                    //       selected === tag.tagname
                    //   ))
                    this.selectedTags = arr
                })
                .catch(function (err) {
                    console.log(err)
                    alert('Error, see console')
                    console.log(err.response.data)
                })
        },
        onTagRemoved(slug) {
            console.log(`Tag removed: ${slug}=======================`);
        },


        addNewPost() {
            console.log(this.titleInput)
            console.log(this.tagId)

            this.tagInfo = this.tagInfo.filter(tag =>
                this.selectedTags.find(selected =>
                    selected === tag.tagName
                ))
                    console.log(this.tagInfo);
                    
            axios.post('http://localhost:3000/posts', {
                image: this.fileInput,
                title: this.titleInput,
                selectedTags: this.tagInfo
            })
                .then(addedPost => {
                    this.$emit('added-post')
                    console.log(addedPost)
                    console.log('=============sdiufhasdoifosdhfoa================')
                })
                .catch(err => {
                    console.log(err)
                })
        },
    },
    template: `
    <div id="form-add" class="container kecil text-center">
        <form class="border-shark-form container px-5 py-3 bulet text-center" @submit.prevent="addNewPost">
            <h1>Gif a Post</h1>
            <div class="form-group">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Title"
                    v-model="titleInput"
                >
            </div>
            <div class="row">
                <div class="form-group col-6">
                    <div class="imgUp">
                        <picture-input
                            accept="image/gif,image/jpeg,image/png"
                            removeButtonClass="btn btn-secondary button secondary"
                            
                            @change="onChange"
                            :custom-strings="{
                                upload: '<h1>Bummer!</h1>',
                                drag: 'GIF here or GTFO'
                              }"
                        >
                        </picture-input>
                    </div>
                    <div class="custom-file">
                        <input 
                            type="file" 
                            class="custom-file-input" 
                            id="inputGroupFile01" 
                            ref="file"
                            @change="onChange"
                        >
                    </div>
                </div>
                <div class="form-group col-6">
                    <tags-input     
                        element-id="tags" 
                        v-model="selectedTags" 
                        :existing-tags="existTags"
                        :typeahead="true">
                        @tag-removed="onTagRemoved"
                    </tags-input>
                </div>
                <div class="form-group col">

                    <button type="submit" class="btn btn-submit tengah">Submit</button>
                </div>
            </div>
        </form>

        
    </div>
    `
})