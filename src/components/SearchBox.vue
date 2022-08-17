<template>
    <div id="searchbox-wrap">
        <div class="close" @click="$emit('close')"></div>
        <div id="searchbox-container">
            <div class="search-title">Search for posts</div>
            <el-input v-model="searchWord" class="w-50 m-2 search-input" placeholder="Type something">
                <template #prefix>
                    <el-icon class="el-input__icon"><search /></el-icon>
                </template>
            </el-input>
            <div class="posts-container">
                <PostList :allPosts="filterPosts"></PostList>
            </div>
        </div>
    </div>
</template>
<script>
import PostList from './PostList.vue'
export default {
    data() {
        return {
            searchWord: ''
        }
    },
    computed: {
        filterPosts() {
            return this.allPosts.filter(el => el.attributes.title.toLowerCase().includes(this.searchWord.toLowerCase()))
        },
    },
    props: {
        allPosts: Array
    },
    components: {
        PostList
    }
}
</script>
<style scoped>
    #searchbox-wrap {
        position: fixed;
        top: 0;
        left: 0;
        padding-top: 150px;
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 5;
    }
    #searchbox-container {
        width: 75%;
        height: 80%;
        margin: auto;
    }
    .posts-container {
        height: inherit;
        overflow-y: auto;
        overflow-x: hidden;
        overscroll-behavior: container;
    }
    .posts-container::-webkit-scrollbar {
        width: .4em;
    }
    .posts-container::-webkit-scrollbar-thumb {
        background-color: rgb(201, 201, 201);
        border-radius: 50px;
    }
    .search-input {
        margin-bottom: 30px;
    }
    .search-title {
        font-size: 16px;
        text-align: center;
        font-weight: 400;
        color: rgb(120, 120, 120);
        margin-bottom: 10px;
    }
    .close {
        position: absolute;
        right: 32px;
        top: 32px;
        width: 32px;
        height: 32px;
        opacity: 0.3;
        cursor: pointer;
    }
    .close:hover {
        opacity: 1;
    }
    .close:before, .close:after {
        position: absolute;
        left: 15px;
        content: ' ';
        height: 33px;
        width: 2px;
        background-color: #333;
    }
    .close:before {
        transform: rotate(45deg);
    }
    .close:after {
        transform: rotate(-45deg);
    }

</style>