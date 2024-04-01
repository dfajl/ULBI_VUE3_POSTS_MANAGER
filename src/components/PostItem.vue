<template>
	<div class="post_item">
		<div>
			<div><strong>Номер поста:</strong> {{ post.id }}</div>
			<div><strong>Название:</strong> {{ post.title }}</div>
			<div><strong>Описание:</strong> {{ post.body }}</div>
		</div>
		<div>
			<my-button @click="deletePost" class="post_btn"
				>Удалить пост</my-button
			>
			<my-button @click="openPost" class="post_btn"
				>Открыть пост</my-button
			>
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
				//console.log(this.post);
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
			border: 2px solid teal;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		&_btn {
			width: 100%;
		}
	}
</style>
