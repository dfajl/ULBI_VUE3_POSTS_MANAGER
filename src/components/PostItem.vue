<template>
	<div class="post_item">
		<div style="width: 80%">
			<div><strong>Номер поста:</strong> {{ post.id }}</div>
			<div><strong>Название:</strong> {{ post.title }}</div>
			<div><strong>Описание:</strong> {{ post.body }}</div>
		</div>
		<div style="width: 10%">
			<my-button @click="deletePost" class="post_btn" marginBottom="10px">
				Удалить пост
			</my-button>
			<my-button @click="openPost" class="post_btn">
				Открыть пост
			</my-button>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		props: {
			post: {
				type: Object,
				required: true,
			},
		},

		data() {
			return {};
		},
		methods: {
			deletePost() {
				this.$emit('deletePost', this.post);
			},
			openPost() {
				// переходим на страницу данного поста
				this.$router.push(`/posts/${this.post.id}`);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.post {
		&_item {
			margin-top: 15px;
			padding: 15px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-radius: 5px;
			background-color: rgb(203, 201, 201);
			box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.675);
		}
		&_btn {
			width: 100%;
		}
	}
</style>
