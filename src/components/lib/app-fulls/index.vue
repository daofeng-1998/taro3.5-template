<script
    lang="ts"
    setup
>
interface IPros {
    colData?: [][]
}

defineProps<IPros>();
</script>

<script lang="ts">
export default { name: 'AppFulls' };
</script>

<template>
    <div class="falls-wrapper">
        <div
            v-for="(col, col_index) in colData"
            :key="col_index"
            class="falls-col"
        >
            <div
                v-for="(item, i) in col"
                :key="i"
                class="falls-item"
            >
                <slot :current="item" />
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>
