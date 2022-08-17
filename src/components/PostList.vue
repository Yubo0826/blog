<template>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
        <el-row :gutter="20">
            <el-col 
                :xs="24" :sm="24" :md="12" :lg="8" :xl="8"
                v-for="post in displayPosts"
                :key="post.id"
                >
                <div class="post-item">
                    <el-card :body-style="{ padding: '0px' }" >
                        <ProgressiveImage
                            lazy-placeholder
                            :placeholder-src="post.attributes.image.data.attributes.formats.thumbnail.url"
                            :src="post.attributes.image.data.attributes.url"
                            @click="$router.push(`/posts/${post.id}`)"
                        />
                        <div style="padding: 15px;">
                            <h2 class="title" @click="$router.push(`/posts/${post.id}`)">{{ post.attributes.title }}</h2>
                            <!-- <Markdown :source="post.attributes.content"/> -->
                            <p style="line-height:1.7rem">{{ handlePost(post.attributes.content) }}</p>
                            <div>
                                <el-button type="warning" size="small" plain
                                    v-for="tag in post.attributes.tags.data"
                                    :key="tag.id"
                                >
                                    {{ tag.attributes.name }}
                                </el-button>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <div v-if="loading">
            <img src="../assets/Eclipse-1s-45px.svg" alt="">
        </div>
    </div>
</template>
<script>
import { ProgressiveImage } from "vue-progressive-image"
import { toRaw } from 'vue'

export default {
    components: {
        ProgressiveImage,
    },
    props: {
        allPosts: Array
    },
    data() {
        return {
            displayPosts: [],
            busy: false,
            loading: false,
            postSize: 0,
        }
    },
    created() {
        console.log(this.allPosts);
    },
    watch: {
        allPosts(newValue, oldValue) {
            console.log('watch.');
            const rawAllPosts = toRaw(newValue)
            if(rawAllPosts !== []) {
                this.loadMore()
            }
        }
    },
    methods: {
        handlePost(txt) {
            const len = 40      // 文章預覽字數
            if(txt != null && txt != '') {
                return txt.replace(/[#`*]/g, '').substring(0, len) + '...'
            }
            return ''
        },
        loadMore() {
            console.log('loadMore.');
            console.log('allPosts 長度 ' + this.allPosts.length);
            
            // busy false 執行loadMore；busy true 不執行
            this.busy = true
            this.loading = true

            if (this.allPosts.length <= 6) {
                this.displayPosts = this.allPosts
                this.busy = true
                this.loading = false
            } else {
                this.postSize += 6
                if (this.postSize <= this.allPosts.length) {
                    this.displayPosts = this.allPosts.slice(0, this.postSize)
                    this.busy = false
                    this.loading = false
                } else {
                    this.displayPosts = this.allPosts
                    this.busy = true
                    this.loading = false
                }
            }
            console.log('displayPosts 長度' + this.displayPosts.length);
            // axios.get(this.$strapiURL + `/api/articles?populate=*&pagination[pageSize]=${this.postSize}`)
            //     .then((res) => {
            //         if(JSON.stringify(this.posts) === JSON.stringify(res.data.data)) {
            //             this.busy = true
            //             this.loading = false
            //         } else {
            //             this.posts = res.data.data
            //             this.busy = false
            //             this.loading = false
            //         }
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     })
        }
    },
}
</script>
<style scoped>
    .title:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    .filter-category-btn {
        padding: 8px;
        margin: 5px;
        color: #409eff;
        background-color: #f5f7fa;
        border: 0;
        border-radius: 4px;
        cursor: pointer;
    }
    .active {
        color: #fff;
        background-color: #409eff;
    }
    .post-item {
        margin-bottom: 19px;
    }
    .v-progressive-image {
        cursor: pointer;
    }
    .v-enter-active,
    .v-leave-active {
    transition: opacity 0.25s ease;
    }

    .v-enter-from,
    .v-leave-to {
    opacity: 0;
    }
    
</style>