export default{
	namespaced:true,
	state:()=>({
		 // 购物车的数组，用来存储购物车中每个商品的信息对象
		    // 每个商品的信息对象，都包含如下 6 个属性：
		    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart:JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	mutations:{
		addToCart(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		updateGoodsState(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_state = goods.goods_state
			}
			this.commit('m_cart/saveToStorage')
		},
		updateGoodsCount(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		// 根据 Id 从购物车中删除对应的商品信息
		removeGoodsById(state, goods_id) {
		  // 调用数组的 filter 方法进行过滤
		  state.cart = state.cart.filter(x => x.goods_id !== goods_id)
		  // 持久化存储到本地
		  this.commit('m_cart/saveToStorage')
		},
		// 更新所有商品的勾选状态
		updateAllGoodsState(state, newState) {
		  // 循环更新购物车中每件商品的勾选状态
		  state.cart.forEach(x => x.goods_state = newState)
		  // 持久化存储到本地
		  this.commit('m_cart/saveToStorage')
		}
		
	},
	getters:{
		total(state){
			return state.cart.reduce((total,item)=>total += item.goods_count,0)
		},
		checkedCount(state){
			return state.cart.filter(x=> x.goods_state).reduce((total,item)=>total += item.goods_count,0)
		},
		checkedGoodsAmount(state){
			return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total += item.goods_count * item.goods_price,0)
		}
	},
}