<template>
	<view class="my-container">
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
import {mapState} from 'vuex'
import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				
			};
		},
		computed:{
			// 2. 从 m_user 模块中导入需要的 token 字符串
			    ...mapState('m_user', ['token']),
		}
	}
</script>

<style lang="scss">
page,
.my-container {
  height: 100%;
}
</style>
