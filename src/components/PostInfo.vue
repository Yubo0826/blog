<template>
    <div class="info-container">
        <a href="https://www.cakeresume.com/yubo0826" class="author" target="_blank">Brandon Chou</a>
        <span>．{{ readingTime(post.content) }} min read ． {{ post.publishedAt.split('T')[0] }}</span>
    </div>
    <div class="tags-container">
        <el-button type="warning" size="small" plain
            v-for="tag in post.tags.data"
            :key="tag.id"
        >
            {{ tag.attributes.name }}
        </el-button>
    </div>
</template>
<script>
export default {
    props: [ 'post' ],
    methods: {
        readingTime(txt) {
            const wpm = 30     // 粗估一分鐘讀幾個字
            const filterPost = txt.replace(/[#`*]/g, '')
            const words = filterPost.trim().split(/\s+/).length
            return Math.ceil(words / wpm)
        }
    }
}
</script>
<style scoped>
    .info-container {
        margin-bottom: 10px;
    }
    .author {
        color: rgb(76, 194, 65);
    }
    .tags-container {
        margin-bottom: 20px;
    }
</style>