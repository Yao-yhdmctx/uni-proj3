import {mapGetters} from 'vuex'
export default {
	computed:{
		...mapGetters('m_cart',['total']),
	},
	  watch: {
	    // 监听 total 值的变化
	    total() {
	      // 调用 methods 中的 setBadge 方法，重新为 tabBar 的数字徽章赋值
	      this.setBadge()
	    },
	  },
	onShow(){
		this.setBadge()
	},
	methods:{
		setBadge(){
			uni.setTabBarBadge({
				index:2,
				text:this.total + ''
			})
		}
	}
}