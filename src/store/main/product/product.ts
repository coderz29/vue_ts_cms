import { getGoodsCategoryList } from '@/service/main/product/product'
import { defineStore } from 'pinia'

interface IListState {
  goodsList: any[]
}

const useGoodsListStore = defineStore('product', {
  state: (): IListState => ({
    goodsList: []
  }),
  actions: {
    async getGoodsListAction() {
      getGoodsCategoryList().then((res) => {
        this.goodsList = res.data.list
      })
    }
  }
})

export default useGoodsListStore
