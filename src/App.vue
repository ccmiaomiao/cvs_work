<template>
    <div id="app">
        <xheader></xheader>
        <div class="content" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.3)" element-loading-text="加载中...">
            <div :is="page" :bills="propBills" :categories="propCategories"></div>
        </div>
        <div class="tabs">
            <div title="表格~" class="flex ac jc" :class="{ open: page === 'xtable' }" @click="page = 'xtable'">
                <i class="xmindfont icon-table"></i>
            </div>
            <div title="还没有做的chart~" class="flex ac jc" :class="{ open: page === 'xchart' }" @click="page = 'xchart'">
                <i class="xmindfont icon-chart"></i>
            </div>
            <div class="flex ac jc" title="月度筛选" element-loading-background="rgba(0, 0, 0, 0.1)">
                <i class="xmindfont icon-date"></i>
                <el-date-picker class="hovershow" v-model="month" type="month" placeholder="选择月"> </el-date-picker>
            </div>
            <div class="flex ac jc" title="分类筛选" element-loading-background="rgba(0, 0, 0, 0.1)">
                <i class="xmindfont icon-category"></i>
                <el-select class="hovershow" v-model="category" clearable placeholder="请选择">
                    <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c.id"> </el-option>
                </el-select>
            </div>
            <div class="flex ac jc import" v-loading="importing" element-loading-background="rgba(0, 0, 0, 0.1)">
                <input title="导入新的csv" type="file" accept=".csv" @change="imp" />
                <i v-show="!importing" class="xmindfont icon-import"></i>
            </div>
        </div>
    </div>
</template>

<script>
import xheader from './components/xheader';
import xchart from './components/xchart';
import xtable from './components/xtable';

import { loadcsv, importcsv } from './utils';

export default {
    name: 'App',
    components: { xheader, xchart, xtable },
    data() {
        return {
            loading: true,
            importing: false,
            page: 'xtable',
            csvs: ['bill', 'categories'],
            bills: [],
            categories: [],
            categoriesMap: {},
            month: '',
            category: ''
        };
    },
    computed: {
        propBills() {
            const _t = this;
            let bills = _t.bills;
            if (_t.month) {
                bills = bills.filter(b => {
                    return b.month === new Date(_t.month).getMonth() && b.year === new Date(_t.month).getFullYear();
                });
            }
            if (_t.category) {
                bills = bills.filter(b => b.category === _t.category);
            }
            return bills;
        },
        propCategories() {
            const _t = this;
            if (!_t.categories || !_t.categories.length) return null;
            // 仅返回支出类型的
            const categories = _t.categories
                .filter(c => c.type == '0')
                .map(c => {
                    c.totalAmount = 0;
                    c.bills.map(b => {
                        c.totalAmount += _t.propBills.indexOf(b) >= 0 ? b.amount : 0;
                    });
                    return c;
                })
                .filter(c => c.totalAmount)
                .sort((a, b) => b.totalAmount - a.totalAmount);
            return categories;
        }
    },
    created() {
        const _t = this;
        _t.loadData().then(reses => {
            setTimeout(() => {
                // 看看loading的效果
                _t.loading = false;
                _t.categories = reses[1];

                reses[1].map(c => {
                    c.bills = []; // 映射分类下所有账单
                    _t.categoriesMap[c.id] = c;
                });

                _t.bills = _t.postBills(reses[0]);
            }, 333);
        });
    },
    methods: {
        loadData() {
            const _t = this;
            return Promise.all([loadcsv(_t.csvs[0]), loadcsv(_t.csvs[1])]);
        },
        postBills(bills) {
            const _t = this;
            bills.map(b => {
                b.categoryName = _t.categoriesMap[b.category].name;
                b.time = +b.time;
                b.amount = +b.amount;
                const time = new Date(b.time);
                b.dateStr = time.format('yyyy-MM-dd');
                b.month = time.format('MM') - 1;
                b.year = +time.format('yyyy');
                _t.categoriesMap[b.category].bills.push(b);
            });
            return bills;
        },
        imp(e) {
            const _t = this;
            _t.importing = true;
            importcsv(e.target.files[0]).then(res => {
                setTimeout(() => {
                    let wrong = false;
                    for (let i = 0; i < res.length; i++) {
                        if (!res[i].amount || !res[i].time || !res[i].category || !res[i].type) {
                            wrong = true;
                            break;
                        }
                    }
                    if (wrong) {
                        _t.$message({
                            message: 'csv文件有误，请检查后重新上传',
                            type: 'error'
                        });
                    } else {
                        _t.postBills(res).map(b => {
                            _t.bills.push(b);
                        });
                    }
                    // 看看loading的效果
                    e.target.value = '';
                    _t.importing = false;
                }, 333);
            });
        }
    }
};
</script>

<style lang="less" scoped>
#app {
    position: relative;
    height: 100%;
    min-width: 360px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
/deep/ .el-loading-spinner {
    .path {
        stroke: #fff;
    }
    .el-loading-text {
        color: #fff;
    }
}
.content {
    width: 100%;
    height: 100%;
    padding-top: 60px;
    overflow: auto;
}
.tabs {
    position: fixed;
    left: 0;
    top: 60px;
    z-index: 1;
    > div {
        height: 45px;
        width: 45px;
        background: #666;
        color: #fff;
        margin-bottom: 2px;
        cursor: pointer;
        transition: all 0.6s;
        position: relative;
        &:hover,
        &.open {
            color: #ccc;
            background: #111;
            transform: translate(1px, 1px);
        }
        .xmindfont {
            font-size: 18px;
        }
        &.import {
            input {
                position: absolute;
                height: 100%;
                width: 100%;
                opacity: 0;
                cursor: pointer;
            }
            /deep/ .el-loading-spinner {
                cursor: no-drop;
                height: 45px;
                top: 0;
                margin-top: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                .circular {
                    height: 24px;
                    width: 24px;
                }
            }
        }
        .hovershow {
            position: absolute;
            left: 48px;
            width: 120px;
            max-width: 0;
            opacity: 0;
            transition: all 0.3s;
        }
        &:hover {
            .hovershow {
                max-width: 120px;
                opacity: 1;
            }
        }
    }
}
</style>
