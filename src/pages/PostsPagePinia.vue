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
				method: infinityPostsScroll,
				totalPages,
			}"
		></div>
	</div>
</template>

<script>
	import PostForm from '@/components/PostForm';
	import PostList from '@/components/PostList';
	import usePiniaStore from '../composables/usePiniaStore';
	import { ref, onMounted } from 'vue';

	export default {
		components: {
			PostForm,
			PostList,
		},

		setup() {
			let dialogVisible = ref(false);
			const {
				isPostsLoading,
				selectedSort,
				searchQuery,
				page,
				totalPages,
				sortOptions,
				sortedPosts,
				sortedAndSearchPosts,
				posts,
				infinityPostsScroll,
				setSearchQuery,
				setSelectedSort,
				setPosts,
				loadPosts,
			} = usePiniaStore();

			function createPost(post) {
				const localPosts = [...posts.value, post];
				setPosts(localPosts);
				dialogVisible.value = false;
			}

			function deletePostItem(post) {
				const localPosts = posts.value.filter(
					(item) => item.id != post.id,
				);
				setPosts(localPosts);
			}

			function showDialog() {
				dialogVisible.value = true;
			}

			onMounted(() => {
				loadPosts();
			});

			return {
				dialogVisible,
				isPostsLoading,
				selectedSort,
				searchQuery,
				sortOptions,
				sortedPosts,
				sortedAndSearchPosts,
				page,
				totalPages,
				showDialog,
				deletePostItem,
				createPost,
				setSearchQuery,
				setSelectedSort,
				infinityPostsScroll,
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
