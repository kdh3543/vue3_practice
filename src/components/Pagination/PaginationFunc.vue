<template>
  <div class="pagination">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" v-if="currentPage !== 1">
          <a class="page-link" @click="getTodos(currentPage - 1)">Previous</a>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
        >
          <a class="page-link" @click="getTodos(page)">{{ page }}</a>
        </li>

        <li class="page-item" v-if="currentPage !== totalPages">
          <a class="page-link" @click="getTodos(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const getTodos = (page) => {
      emit('get-todos', page)
    }
    return {
      getTodos,
    }
  },
}
</script>
<style>
.pagination {
  display: flex;
  justify-content: center;
}
li {
  cursor: pointer;
}
</style>
