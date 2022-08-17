<script setup>
import PostInfo from '../PostInfo.vue'
import { ProgressiveImage } from "vue-progressive-image"
</script>

<template>
    <div class="post-container">
        <h1>{{ post.title }}</h1>
        <PostInfo :post="post" />
        <ProgressiveImage
            lazy-placeholder
            :placeholder-src="post.image.data.attributes.formats.thumbnail.url"
            :src="post.image.data.attributes.url"
        />
        <p class="CoverImageAuthor">Author by <a :href="post.image.data.attributes.caption">{{ post.image.data.attributes.alternativeText }}</a></p>
        <div class="article-container">
            <!-- <Markdown :source="post.content" /> -->
            <v-md-preview :text="post.content"></v-md-preview>
        </div>
        <vue-utterances repo="Yubo0826/vue-blog" theme="github-light" issue-term="title" />
    </div>
</template>
<script>
import axios from 'axios'
import VueUtterances from "vue-utterances"
// import 'highlight.js/styles/base16/eva.css'

export default {
    components: {
        VueUtterances
    },
    data() {
        return {
            post: {}
        }
    },
    created() {
        const post_id = this.$route.params.id
        axios.get(this.$strapiURL + `/api/articles/${post_id}?populate=*`)
            .then((res) => {
                console.log(res.data)
                this.post = res.data.data.attributes
                window.document.title = this.post.title
            })
    },
    methods: {

    },
}
</script>
<style scoped>
    .post-container {
        width: 1000px;
        margin: 70px auto;
    }
    .article-container {
        margin-bottom: 50px;
    }
    .CoverImageAuthor {
        font-size: 14px;
    }

    @media screen and (max-width: 1000px){
    .post-container {
        width: 100%;
    }
}
</style>