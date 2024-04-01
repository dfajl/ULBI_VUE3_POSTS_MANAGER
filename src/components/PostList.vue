<template>
	<div class="post-item_wrapper">
		<h3>Список постов</h3>
		<transition-group name="post-list">
			<post-item
				@deletePost="deletePost"
				v-for="post in posts"
				:key="post.id"
				:post="post"
			/>
			<!-- обрати внимание, что id поста мы берем с сервера (посты оттуда идут уже со своим id)  -->
		</transition-group>
		<!-- анимация для списка который итерирутся через  v-for. просто оборачиваем его в элемент transition-group
		и присваиваем ему имя name="post-list". в стилях используем определенные классы-->
		<div class="notification" v-if="!posts.length">
			ПУСТО :( <br />
			ДОБАВЬ ПОСТ!
		</div>
	</div>
</template>

<script>
	import PostItem from '@/components/PostItem.vue';
	export default {
		components: { PostItem },
		props: {
			posts: {
				type: Array,
				required: true,
			},
		},

		data() {
			return {};
		},
		methods: {
			deletePost(post) {
				this.$emit('delete', post);
				/* тут отдаем наверх тот же пост. но пишем не this.post, а post, т.к. тут post берется как элемент итерации по массиву posts*/
				console.log(post);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.post-item_wrapper {
		margin-top: 50px;
	}
	.notification {
		border: 1px solid seagreen;
		color: rgb(156, 43, 43);
		margin: 0 auto;
		text-align: center;
		margin-top: 150px;
	}

	// анимация для списка transition-group name="post-list"
	.post-list-item {
		display: inline-block;
		margin-right: 10px;
	}
	.post-list-enter-active,
	.post-list-leave-active {
		transition: all 0.5s;
	}
	.post-list-enter,
	.post-list-leave-to {
		opacity: 0;
		transform: translateX(130px);
	}
	.post-list-move {
		//анимация для сортировки
		transition: transform 0.7s;
	}
	// конец анимации для списка
</style>
