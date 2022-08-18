<script setup>
import PostInfo from '../PostInfo.vue'
import { ProgressiveImage } from "vue-progressive-image"
import VueUtterances from "vue-utterances"
</script>

<template>
    <div v-if="loading" class="loading-wrap">
        <img src="../../assets/loading.png" class="loader" />
    </div>

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

export default {
    data() {
        return {
            post: {},
            loading: true
        }
    },
    created() {
        this.loading = true
        const post_id = this.$route.params.id
        axios.get(this.$strapiURL + `/api/articles/${post_id}?populate=*`)
            .then((res) => {
                console.log(res.data)
                this.post = res.data.data.attributes
                window.document.title = this.post.title
                this.loading = false
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
    .loading-wrap {
        position: fixed;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgb(255, 255, 255);
        opacity: 90%;
        z-index: 1000;
    }
    .loader {
        position: absolute;
        width:150px;
        height:150px;
        position:fixed;
        top:40%;
        left:47.5%; 
        margin-left:-25px;
        margin-top:-25px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }

    @media screen and (max-width: 1000px){
    .post-container {
        width: 100%;
    }
}
</style>