<template>
	<div>
		<h1 style="text-align: center">Страница с постами</h1>
		<div class="btn_wrapper">
			<my-button class="titleBtn" @click="showDialog">
				Создать пост
			</my-button>

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
	import { ref, onMounted, computed } from 'vue';
	import { useStore } from 'vuex';

	export default {
		components: {
			PostForm,
			PostList,
		},

		setup() {
			const store = useStore(); // инициализация стора
			let dialogVisible = ref(false);

			//инициализация стейта стора
			const posts = computed(() => store.state.post.posts);
			const isPostsLoading = computed(
				() => store.state.post.isPostsLoading,
			);
			const selectedSort = computed(() => store.state.post.selectedSort);
			const searchQuery = computed(() => store.state.post.searchQuery);
			const page = computed(() => store.state.post.page); //номер страницы
			const limit = computed(() => store.state.post.limit); //кол-во постов на странице
			const totalPages = computed(() => store.state.post.totalPages); //кол-во страниц
			const sortOptions = computed(() => store.state.post.sortOptions);

			//инициализация геттеров стора
			const sortedPosts = computed(
				() => store.getters['post/sortedPosts'],
			);
			const sortedAndSearchPosts = computed(
				() => store.getters['post/sortedAndSearchPosts'],
			);

			//инициализация мутаций стора
			//const setPage = (event) => store.commit('post/setPage', event);
			const setSearchQuery = (searchQuery) =>
				store.commit('post/setSearchQuery', searchQuery);
			const setSelectedSort = (selectedSort) =>
				store.commit('post/setSelectedSort', selectedSort);

			//инициализация actions
			const loadInfinityPosts = () =>
				store.dispatch('post/loadInfinityPosts');

			function createPost(post) {
				const localPosts = [...posts.value, post];
				store.commit('post/setPosts', localPosts);
				dialogVisible.value = false;
			}

			function deletePostItem(post) {
				const localPosts = posts.value.filter(
					(item) => item.id != post.id,
				);
				store.commit('post/setPosts', localPosts);
			}

			function showDialog() {
				dialogVisible.value = true;
			}

			onMounted(() => {
				store.dispatch('post/fetchPosts');
			});

			return {
				dialogVisible,
				showDialog,
				deletePostItem,
				createPost,
				isPostsLoading,
				selectedSort,
				searchQuery,
				sortOptions,
				sortedPosts,
				sortedAndSearchPosts,
				page,
				totalPages,
				//setPage,
				setSearchQuery,
				setSelectedSort,
				loadInfinityPosts,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.btn_wrapper {
		border-radius: 5px;
		margin-top: 20px;
		padding: 0 10px 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		background-color: rgb(179, 178, 178);
		box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.675);
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
	.observer {
		height: 10px;
	}
</style>
