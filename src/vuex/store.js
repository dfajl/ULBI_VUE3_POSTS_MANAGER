import { createStore } from 'vuex';
import { postModule } from './postModule';

// создал стор и тут же его проэкспортировал
// зарегистрировал глобально стор-модуль postModule как post
export default createStore({
	modules: {
		post: postModule,
	},
});
