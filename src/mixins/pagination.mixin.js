import _ from 'lodash';

export default {
    data() { 
        return {
            page: 1,
            pageSize: 5,
            pageSizeForProfile: 3,
            pageCount: 0,
            allItems: [],
            items: []
        }
    },
    methods: {
        pageChangeHandler(page) {
            this.items = this.allItems[page - 1] || this.allItems[0]
        },
        setupPagination(allItems) {
            this.allItems = _.chunk(allItems, this.pageSize)
            this.pageCount = _.size(this.allItems)
            this.items = this.allItems[this.page - 1] || this.allItems[0]
        },
        setupPaginationForProfile(allItems) {
            this.allItems = _.chunk(allItems, this.pageSizeForProfile)
            this.pageCount = _.size(this.allItems)
            this.items = this.allItems[this.page - 1] || this.allItems[0]
        }
    }
};