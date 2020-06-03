<template>
    <div class="xtable">
        <div class="anly">当前条件下，总支出为￥{{ pay }}, 总收入为￥{{ income }}</div>
        <div class="tableHead">
            分类支出信息
        </div>
        <el-table v-if="categories" :data="categories" border style="width: 100%">
            <el-table-column prop="name" label="账单分类"> </el-table-column>
            <el-table-column label="账单类型">
                <template slot-scope="scope">
                    {{ scope.row.type == 1 ? '收入' : '支出' }}
                </template>
            </el-table-column>
            <el-table-column prop="totalAmount" label="分类支出总金额"></el-table-column>
        </el-table>
        <div class="tableHead">
            全部账单
        </div>
        <el-table :data="bills" class="billsT" :class="{ hasCategory: categories && categories.length }" border style="width: 100%">
            <el-table-column prop="dateStr" label="日期"></el-table-column>
            <el-table-column label="账单类型" width="180">
                <template slot-scope="scope">
                    {{ scope.row.type == 1 ? '收入' : '支出' }}
                </template>
            </el-table-column>
            <el-table-column prop="amount" label="金额"></el-table-column>
            <el-table-column prop="categoryName" label="账单分类"> </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'xtable',
    props: ['bills', 'categories'],
    computed: {
        pay() {
            if (!this.bills || !this.bills.length) return 0;
            let bills = this.bills.filter(b => b.type == '0').map(b => b.amount);
            if (!bills.length) return 0;
            return bills.reduce((total, amount) => total + amount);
        },
        income() {
            if (!this.bills || !this.bills.length) return 0;
            let bills = this.bills.filter(b => b.type == '1').map(b => b.amount);
            if (!bills.length) return 0;
            return bills.reduce((total, amount) => total + amount);
        }
    }
};
</script>

<style lang="less" scoped>
.xtable {
    padding: 20px 20px 20px 65px;
    height: 100%;
}
.anly {
    color: #fff;
    padding: 0 20px 20px;
}
.billsT {
    height: calc(100% - 40px);
    margin-bottom: 20px;
    /deep/ .el-table__body-wrapper {
        overflow: auto;
        height: 100%;
    }
}
.tableHead {
    padding: 20px 0;
    color: #fff;
}
</style>
