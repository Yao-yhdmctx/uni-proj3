<template>
	<view>
		<view class="search-box">
		  <my-search @click="gotoSearch"></my-search>
		</view>
		<!-- 轮播图区 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id" class="swiper-item">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层区 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor-title" mode="widthFix"></image>
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode="widthFix" :style="{width:item.product_list[0].image_width + 'rpx'}"></image>
					</navigator>
					<view class="right-img-box">
						<navigator :url="item2.url" class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2 != 0">
							<image :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
			};
		},
		onLoad(){
			this.getSwiperList()
			this.getNavList()
			this.getFoolList()
		},
		methods:{
			async getSwiperList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				console.log(res);
				if(res.meta.status !== 200)return uni.$showMsg()
					this.swiperList = res.message
				uni.$showMsg('数据请求成功')
			},
			async getNavList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !== 200)return uni.$showMsg()
					this.navList = res.message
				uni.$showMsg('数据请求成功')
			},
			navClickHandler(item){
				if(item.name == '分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			async getFoolList(){
				let {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status !== 200) return uni.$showMsg()
				res.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						prod.url = '/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
				uni.$showMsg('数据请求成功')
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height: 330rpx;
	.swiper-item, image{
		width: 100%;
		height: 100%;
	}
}
.nav-list{
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
}
.nav-img{
	width: 120rpx;
	height: 140rpx;
}
.floor-title{
	height: 60rpx;
	width: 100%;
	display: flex;
}
.right-img-box{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.floor-img-box{
	display: flex;
	padding-left: 10rpx;
}
	.search-box {
	  // 设置定位效果为“吸顶”
	  position: sticky;
	  // 吸顶的“位置”
	  top: 0;
	  // 提高层级，防止被轮播图覆盖
	  z-index: 999;
	}
</style>
