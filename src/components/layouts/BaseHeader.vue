<script lang="ts" setup>
import hotkeys from 'hotkeys-js';
import router from '~/router';
import { toggleDark } from '~/composables/dark';
import { pageReload } from '~/composables/utils';
import { useFullscreen } from '@vueuse/core'
import { useSettingStore } from "~/store/modules/setting";
import { useUserStore } from "~/store/modules/user";
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const fullscreen = ref(false);
const { isFullscreen, toggle } = useFullscreen()
const isShowDrawer = ref(false);
const isShowSearch = ref(false);
const settingStore = useSettingStore();
const collapse = () => {
  settingStore.collapse = !settingStore.collapse;
}

window.onresize = () => {
  fullscreen.value = document.body.clientWidth <= 768;
}
const onKeyS = (e: KeyboardEvent) => {
  e.preventDefault();
  isShowSearch.value = true;
}

const logout = () => {
  const userStore = useUserStore();
  userStore.logout();
  router.push('/login');
}

onMounted(() => {
  hotkeys('s', onKeyS);
})
onUnmounted(() => {
  hotkeys.unbind('s', onKeyS);
});

</script>

<template>
  <div class="acme-header">
    <div class="header-logo hidden-sm-and-down">
      <div class="logo"><img src="../../assets/logo.png" alt=""></div>
      <div class="title" v-if="!settingStore.collapse">{{ settingStore.title }}</div>
    </div>
    <div class="header-content">
      <div class="header-tabs">
        <div class="menubtn">
          <div class="btn-item" @click="collapse">
            <el-icon>
              <acme-icon :class="['el', settingStore.collapse ? 'expand' : 'fold']" />
            </el-icon>
          </div>
          <div class="btn-item" @click="pageReload">
            <el-icon>
              <acme-icon class="el refreshRight" />
            </el-icon>
          </div>
        </div>
        <div class="breadcrumb hidden-sm-and-down">
          <Breadcrumb />
        </div>
      </div>
      <div class="header-tools">
        <div class="tools-action hidden-xs-and-down">
          <el-tooltip effect="dark" content="搜索，快捷键S">
            <div class="action-item" @click="isShowSearch = !isShowSearch">
              <el-icon>
                <Search />
              </el-icon>
            </div>
          </el-tooltip>
          <el-tooltip content="全屏">
            <div class="action-item" @click="toggle">
              <el-icon>
                <FullScreen v-if="isFullscreen" />
                <FullScreen v-else />
              </el-icon>
            </div>
          </el-tooltip>
          <el-tooltip content="黑夜模式">
            <div class="action-item" @click="toggleDark()">
              <i inline-flex i="dark:ep-moon ep-sunny"></i>
            </div>
          </el-tooltip>
          <el-tooltip content="系统设置">
            <div class="action-item hidden-sm-and-down" @click="isShowDrawer = true">
              <el-icon>
                <Tools />
              </el-icon>
            </div>
          </el-tooltip>
        </div>
        <el-dropdown class="tools-user">
          <div class="user-wrapper">
            <el-avatar :size="32" shape="circle" />
            Acme Admin
            <el-icon>
              <ArrowDown />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="user-dropdown">
              <el-dropdown-item command="setting">
                个人设置
              </el-dropdown-item>
              <el-dropdown-item divided @click="logout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- 设置弹窗 -->
    <el-drawer v-model="isShowDrawer" title="系统设置" direction="rtl">
      <template #default>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary">保存设置</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 搜索弹窗 -->
    <el-dialog class="search" width="80%" :fullscreen="fullscreen" v-model="isShowSearch" title="菜单检索" align-center>
      <template #default>
        <SearchPanel @close="isShowSearch = false" />
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.acme-header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--acme-side-menu-bg);

  .header-logo {
    width: var(--acme-layout-side-width);
    display: flex;
    align-items: center;
    height: 100%;
    box-shadow: 10px 0 10px -10px rgba(0, 0, 0, .1);

    .logo {
      height: 100%;
      background-color: var(--acme-side-main-menu-bg);
      width: var(--acme-layout-side-main-width);
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        height: 85%;
      }
    }

    .title {
      width: 0;
      flex-grow: 1;
      padding-left: 10px;
      font-weight: bold;
      text-align: center;
      font-size: 18px;
    }
  }

  .header-content {
    width: 0;
    flex-grow: 1;
    height: 100%;
    padding: 0 10px;
    display: flex;
    user-select: none;
    justify-content: space-between;
    box-shadow: 0 10px 10px -10px rgba(0, 0, 0, .1);
  }

  .header-tabs {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .header-tools {
    display: flex;
    align-items: center;
    justify-content: end;

    .tools-action {
      display: flex;
      align-items: center;
    }

    .action-item {
      width: 30px;
      height: 30px;
      background-color: var(--acme-btn-bg);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      margin-right: 10px;
      cursor: pointer;

      &:hover {
        color: #fff;
        background-color: var(--el-color-primary);

        i {
          animation: animatBtn .3s ease-in-out;
        }
      }
    }

    .tools-user {
      display: inline-block;
      cursor: pointer;

      .user-wrapper {
        .el-avatar {
          vertical-align: middle;
          margin-top: -2px;
          margin-right: 4px;
        }
      }
    }
  }
}

//面包屑样式
.el-breadcrumb__item .el-breadcrumb__inner {
  display: flex;
  align-items: center;

  i {
    margin-right: 5px;
  }
}

.el-breadcrumb {
  display: flex;
  justify-content: center;
}

.search .el-dialog__body {
  padding: 10px !important;
}

.menubtn {
  display: flex;
  align-items: center;
  margin-right: 10px;

  .btn-item {
    width: 30px;
    height: 30px;
    background-color: var(--acme-btn-bg);
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: var(--acme-border-radius);

    &:hover {
      color: #fff;
      background-color: var(--el-color-primary);
    }
  }
}

//动画效果
@keyframes animatBtn {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>
