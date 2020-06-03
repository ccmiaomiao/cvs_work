<template>
    <div class="xchart">
        <div class="xtitle">sorrrrrrrrry, charts么得做, 假装有表格的亚子~~~~~</div>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8"><div class="tabls"></div></el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8"><div class="tabls"></div></el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8"><div class="tabls"></div></el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8"><div class="tabls"></div></el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8"><div class="tabls"></div></el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8"><div class="tabls"></div></el-col>
    </div>
</template>

<script>
export default {
    name: 'xchart'
};
</script>

<style lang='less' scoped>
.xchart{
    padding-left:45px;
    color:#fff;
    .xtitle{
        padding: 20px 0 3px
    }
}
.tabls{
    height: 300px;
    margin: 20px;
    border: 2px solid #fff;
    border-radius: 6px;
}
</style>