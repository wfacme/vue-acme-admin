<script setup lang='ts'>
import { computed, ref, watch } from 'vue'
import type { UseFuseOptions } from '@vueuse/integrations/useFuse'
import { useFuse } from '@vueuse/integrations/useFuse'
interface DataItem {
    firstName: string
    lastName: string
}

const data = ref<DataItem[]>([
    {
        firstName: 'Roslyn',
        lastName: 'Mitchell',
    },
    {
        firstName: 'Cathleen',
        lastName: 'Matthews',
    },
    {
        firstName: 'Carleton',
        lastName: 'Harrelson',
    },
    {
        firstName: 'Allen',
        lastName: 'Moores',
    },
    {
        firstName: 'John',
        lastName: 'Washington',
    },
    {
        firstName: 'Brooke',
        lastName: 'Colton',
    },
    {
        firstName: 'Mary',
        lastName: 'Rennold',
    },
    {
        firstName: 'Nanny',
        lastName: 'Field',
    },
    {
        firstName: 'Chasity',
        lastName: 'Michael',
    },
    {
        firstName: 'Oakley',
        lastName: 'Giles',
    },
    {
        firstName: 'Johanna',
        lastName: 'Shepherd',
    },
    {
        firstName: 'Maybelle',
        lastName: 'Wilkie',
    },
    {
        firstName: 'Dawson',
        lastName: 'Rowntree',
    },
    {
        firstName: 'Manley',
        lastName: 'Pond',
    },
    {
        firstName: 'Lula',
        lastName: 'Sawyer',
    },
    {
        firstName: 'Hudson',
        lastName: 'Hext',
    },
    {
        firstName: 'Alden',
        lastName: 'Senior',
    },
    {
        firstName: 'Tory',
        lastName: 'Hyland',
    },
    {
        firstName: 'Constance',
        lastName: 'Josephs',
    },
    {
        firstName: 'Larry',
        lastName: 'Kinsley',
    },
])

const search = ref('')
const filterBy = ref('both')
// const keys = computed(() => {
//     if (filterBy.value === 'first')
//         return ['firstName']
//     else if (filterBy.value === 'last')
//         return ['lastName']
//     else return ['firstName', 'lastName']
// })

// const resultLimit = ref<number | undefined>(undefined)
// const resultLimitString = ref<string>('')
// watch(resultLimitString, () => {
//     if (resultLimitString.value === '') {
//         resultLimit.value = undefined
//     }
//     else {
//         const float = parseFloat(resultLimitString.value)
//         if (!isNaN(float)) {
//             resultLimit.value = Math.round(float)
//             resultLimitString.value = resultLimit.value.toString()
//         }
//     }
// })
const exactMatch = ref(false)
const isCaseSensitive = ref(false)
const matchAllWhenSearchEmpty = ref(true)
const options = computed<UseFuseOptions<DataItem>>(() => ({
    fuseOptions: {
        keys: ['firstName'],
        // isCaseSensitive: isCaseSensitive.value,
        // threshold: exactMatch.value ? 0 : undefined,
    },
    // resultLimit: 3,
    // matchAllWhenSearchEmpty: matchAllWhenSearchEmpty.value,
}))
const { results } = useFuse(search, data, options)
console.log(results)
</script>

<template>
    <el-card class="box-card" shadow="never">
        <template #header>
            <div class="card-header">
                <strong>模糊检索</strong>
            </div>
        </template>
        <div>
            <input v-model="search" placeholder="Search for someone..." type="text" w-full>
            <div flex flex-wrap>
                <div bg="dark:(dark-300) light-700" mr-2 border="1 light-900 dark:(dark-700)" rounded relative flex
                    items-center>
                    <i i-carbon-filter absolute left-2 opacity-70 />
                    <select v-model="filterBy" px-8 bg-transparent>
                        <option bg="dark:(dark-300) light-700" value="both">
                            Full Name
                        </option>
                        <option bg="dark:(dark-300) light-700" value="first">
                            First Name
                        </option>
                        <option bg="dark:(dark-300) light-700" value="last">
                            Last Name
                        </option>
                    </select>
                    <i i-carbon-chevron-down absolute right-2 pointer-events-none opacity-70 />
                </div>
                <span flex-1 />
                <div flex flex-row flex-wrap gap-x-4>
                    <label class="checkbox">
                        <input v-model="exactMatch" type="checkbox">
                        <span>Exact Match</span>
                    </label>
                    <label class="checkbox">
                        <input v-model="isCaseSensitive" type="checkbox">
                        <span>Case Sensistive</span>
                    </label>
                    <label class="checkbox">
                        <input v-model="matchAllWhenSearchEmpty" type="checkbox">
                        <span>Match all when empty</span>
                    </label>
                </div>
            </div>
        </div>
        <div mt-4>
            <template v-if="results.length > 0">
                <div v-for="result in results" :key="result.item.firstName + result.item.lastName" py-2>
                    <div flex flex-col>
                        <span>
                            {{ result.item.firstName }} {{ result.item.lastName }}
                        </span>
                        <span text-sm opacity-50>
                            Score Index: {{ result.refIndex }}
                        </span>
                    </div>
                </div>
            </template>
            <template v-else>
                <div text-center pt-8 pb-4 opacity-80>
                    No Results Found
                </div>
            </template>
        </div>
    </el-card>
</template>
