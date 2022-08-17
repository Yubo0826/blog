<template>
    <!-- top area -->
    <h1 class="blog-title">Hi! I'm Brandon.</h1>
    <h3 class="blog-second-title">I write articles and take notes about Web Development</h3>
    <div class="searchbox">
        <el-input v-model="searchWord" class="w-50 m-2" placeholder="Type something" @click="searchBox = true">
            <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
            </template>
        </el-input>
    </div>
    <transition>
        <SearchBox :allPosts="posts" @close="closeSearchBox" v-show="searchBox" />
    </transition>
    <div class="category-container flex justify-space-between mb-4">
        <button
            v-for="(item, index) in category"
            :key="item"
            class="filter-category-btn"
            :class="{active: categoryInActive[index]}"
            @click="handleFilterCategoryBtn(index)"
            >{{ item }}</button
        >
    </div>
    
    <!-- main area -->
    <el-row :gutter="40">
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
        <PostList :allPosts="filterPostsByCategory" />
      </el-col>

      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="hidden-sm-and-down">
        <Profile></Profile>
      </el-col>
    </el-row>
</template>
<script>
import axios from 'axios'
import Markdown from 'vue3-markdown-it'
import PostInfo from '../PostInfo.vue'
import Profile from '../Profile.vue'
import PostList from '../PostList.vue'
import SearchBox from '../SearchBox.vue'
import { ProgressiveImage } from "vue-progressive-image"

export default {
    components: {
        Markdown,
        PostInfo,
        ProgressiveImage,
        SearchBox,
        PostList,
        Profile
    },
    computed: {
        filterPostsByCategory() {
            if(this.currentCategory) {
                return this.posts.filter(el => el.attributes.title.includes(this.currentCategory))
            }
            return this.posts
        }
    },
    data() {
        return {
            posts: [],
            busy: false,
            loading: false,
            postSize: 0,
            searchWord: '',
            category: ['Front-End', 'Javascript', 'Vue', 'API工具'],
            categoryInActive: [false, false, false, false],
            currentCategory: null,
            searchBox: false,
            tags: ['HTML', 'CSS', 'VUE']
        }
    },
    created() {
        axios.get(this.$strapiURL + '/api/articles?populate=*')
            .then((res) => {
                this.posts = res.data.data
            })
    },
    methods: {
        handlePost(txt) {
            const len = 40      // 文章預覽字數
            if(txt != null && txt != '') {
                return txt.replace(/[#`*]/g, '').substring(0, len) + '...'
            }
            return ''
        },
        handleFilterCategoryBtn(index) {
            if(this.categoryInActive[index]) {
                this.categoryInActive[index] = !this.categoryInActive[index]
                this.currentCategory = null
            } else {
                this.categoryInActive.forEach((el, ins, arr) => {
                    arr[ins] = false
                })
                this.categoryInActive[index] = true
                this.currentCategory = this.category[index]
            }
        },
        closeSearchBox() {
            this.searchBox = false
            console.log(this.searchBox);
        }
    },
}
</script>
<style scoped>
    .blog-title {
        font-size: 2.25rem;
        text-align: center;
        margin-top: 70px;
    }
    .blog-second-title {
        font-size: 1.25rem;
        font-weight: 500;
        color: rgb(112, 112, 112);
        text-align: center;
    }
    .searchbox {
        width: 500px;
        margin: 0 auto;
    }
    .category-container {
        width: 300px;
        margin: 15px auto;
        margin-bottom: 50px;
    }
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
    .v-enter-active,
    .v-leave-active {
    transition: opacity 0.25s ease;
    }

    .v-enter-from,
    .v-leave-to {
    opacity: 0;
    }

    @media screen and (max-width: 650px){
        .searchbox {
            width: 90%;
        }
    }
    
</style>