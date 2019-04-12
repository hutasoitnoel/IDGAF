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
            selectedTags: '',
            exisTags: {},
            background: 'https://cdn.dribbble.com/users/122051/screenshots/5749053/dribbble_1.gif'
        }
    },
    methods: {
        onChange(image) {
            //axios get tags from google vision
            //return [tags]
            // this.selectedTags = 
            // console.log("masok file handler", this.$refs.file.files[0]);
            // console.log(this.$refs.file)
            // console.log(this.file, 'in===========')
            // this.fileInput = this.$refs.file.files[0];

            this.fileInput = image
            const payload = {
                image           
            }
            console.log(payload.image)
            axios.post('http://localhost:3000/upload', payload)
            .then(function ({ data }) {
                alert('Uploaded')
                console.log(data)
            })
            .catch(function (err) {
                console.log(err)
                alert('Error, see console')
                console.log(err.response.data)
            })

    },
    addNewPost() {

        //axios tembak server create post
        // console.log("adding new post....", this.fileInput);
        // let dataFormat = new FormData();
        // dataFormat.append("title", this.titleInput);
        // dataFormat.append("tag", this.selectedTags);
        // dataFormat.append("image", this.fileInput);
        // console.log(dataFormat, 'heheheheh=============')
        // axios
        //     .post("http://localhost:3000/posts", dataFormat, {
        //         headers: {
        //             token: localStorage.getItem("token"),
        //             "Content-Type": "multipart/form-data"
        //         }
        //     })
        //     .then(addedProduct => {
        //         console.log("new Product Info: ", addedProduct);
        //         this.$store.dispatch("notif", {
        //             type: "success",
        //             message: "New Product Added Successfully."
        //         });
        //         this.$router.push("/products");
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
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
                    <tags-input element-id="tags" v-model="selectedTags" :existing-tags="exisTags"
                    :typeahead="true">
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