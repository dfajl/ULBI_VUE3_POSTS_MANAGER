<template>
	<div>
		<h1 style="text-align: center">Страница с постами</h1>
		<div class="btn_wrapper">
			<my-button class="titleBtn" @click="showDialog">
				Создать пост
			</my-button>

			<my-button @click="fetchPosts">Загрузить посты</my-button>
			<my-select
				:model-value="selectedSort"
				@update:model-value="setSelectedSort"
				:options="sortOptions"
			>
			</my-select>
		</div>

		<my-dialog-window v-model:show="dialogVisible">
			<post-form @create="createPost"></post-form>
		</my-dialog-window>
		<my-input
			placeholder="Найти пост"
			:model-value="searchQuery"
			@update:model-value="setSearchQuery"
			v-focus
		/>
		<post-list
			:posts="sortedAndSearchPosts"
			@delete="deletePostItem"
			v-if="!isPostsLoading"
		>
		</post-list>
		<div class="post-item_wrapper" v-else>Загружаю посты с сервера :)</div>
		<div
			class="observer"
			v-intersection="{
				pageNumber: page,
				method: loadInfinityPosts,
				totalPages,
			}"
		></div>
	</div>
</template>

<script>
	import PostForm from '@/components/PostForm';
	import PostList from '@/components/PostList';
	import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';

	export default {
		components: {
			PostForm,
			PostList,
		},
		data() {
			return {
				dialogVisible: false,
			};
		},
		methods: {
			//вызываем здесь через spread-оператор mapActions и mapMutations
			...mapMutations({
				setPage: 'post/setPage',
				setSearchQuery: 'post/setSearchQuery',
				setSelectedSort: 'post/setSelectedSort',
			}),
			...mapActions({
				fetchPosts: 'post/fetchPosts',
				loadInfinityPosts: 'post/loadInfinityPosts',
			}),

			createPost(post) {
				const localPosts = [...this.posts, post];
				this.$store.commit('post/setPosts', localPosts);
				this.dialogVisible = false;
			},
			deletePostItem(post) {
				let posts = this.posts.filter((item) => item.id != post.id);
				this.$store.commit('post/setPosts', posts);
			},
			showDialog() {
				this.dialogVisible = true;
			},
		},
		mounted() {
			this.fetchPosts();
		},
		computed: {
			...mapState({
				posts: (state) => state.post.posts, // обращаемся к стейту, потом к модулю, потом к самому полю
				isPostsLoading: (state) => state.post.isPostsLoading,
				selectedSort: (state) => state.post.selectedSort,
				searchQuery: (state) => state.post.searchQuery,
				page: (state) => state.post.page, //номер страницы
				limit: (state) => state.post.limit, //кол-во постов на странице
				totalPages: (state) => state.post.totalPages, //кол-во страниц
				sortOptions: (state) => state.post.sortOptions,
			}),
			...mapGetters({
				sortedPosts: 'post/sortedPosts',
				sortedAndSearchPosts: 'post/sortedAndSearchPosts',
			}),
		},
	};
</script>

<style lang="scss" scoped>
	.btn_wrapper {
		margin-top: 20px;
		padding: 0 10px 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 2px solid teal;
		height: 50px;
		background: rgba(148, 146, 146, 0.205);
	}

	.post-item_wrapper {
		margin-top: 50px;
	}

	.page_wrapper {
		display: flex;
		margin-top: 50px;
		justify-content: center;
		.page {
			font-size: 20px;
			border: 1px solid black;
			margin-right: 10px;
			padding: 5px;
			cursor: pointer;
		}
	}

	.currentPage {
		background: rgba(46, 139, 86, 0.684);
	}

	.observer {
		height: 10px;
	}
</style>
