<template>
  <div>
    <div class="search">
      <el-input placeholder="请输入歌名或歌手名" v-model="input" clearable @keyup.enter.native="search">
      </el-input>
      <el-input placeholder="数量" v-model="num" @keyup.enter.native="search">
      </el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="search"
      ></el-button>
    </div>
    <!-- 显示歌曲列表信息 -->
    <div class="song_list" v-if="flag">
      <ul>
        <li v-for="item in list" :key="item.songmid">
          <div class="img">
            <img
              :src="'http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_' + item.albumid +'_0.jpg'"
              alt=""
            />
          </div>
          <div class="info">
            <div>
              <p>{{ item.songname }}</p>
              <p>
                <span>{{ item.singer[0].name }}</span
                >·{{ item.albumname }}
              </p>
            </div>
            <div class="opt">
              <i class="el-icon-video-play" @click="play(item.songmid)"></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      input: "",
      num: 10,
      list: []
    };
  },
  methods: {
    search() {
      if (this.input) {
        let url =
          "/api/soso/fcgi-bin/client_search_cp?callback=f&aggr=1&cr=1&flag_qc=0&p=1&n="+this.num+"&w=" +
          this.input;

        this.$http.get(url).then(res => {
          let str = res.data;
          let obj = JSON.parse(str.substr(9, str.length - 10));

          this.list = obj.data.song.list;

          // 保存搜索的歌曲信息到本地
          let songListStr = JSON.stringify( this.list);
          window.sessionStorage.setItem('songList', songListStr);

          this.flag = true;
        });
      }
    },
    play (songmid) {
      // 保存当前点击的歌曲id
      window.sessionStorage.setItem('songmid', songmid);
      // 跳转到播放页面
      this.$router.push('play');
    }
  },
  filters: {
    timeFormat: function(time){
      let date = new Date(time);
      return date.getMinutes();
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  position: relative;
  display: flex;
  align-items: center;

  .el-input {
    flex: 1;
    margin: 0 5px;
    display: flex;
    font-size: 13px;
    &:nth-of-type(1){
      flex: 4;
    }
    &:nth-of-type(2){
      flex: 1;
    }
  }
  .el-button {
    vertical-align: middle;
    height: 38px;
    width: 80px;
  }
}

* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

.song_list {
  margin-top: 20px;
  border-radius: 6px;
  padding: 5px;
  background-color: #fff;
  ul {
    li {
      box-shadow: 0 4px 5px 3px rgba(207, 199, 199, 0.3);
      margin: 15px 0;
      display: flex;
      padding: 8px;

      &:hover {
        box-shadow: 0 6px 7px 3px rgba(134, 129, 129, 0.3);
      }

      .img {
        width: 90rem / 50;
        height: 90rem / 50;
        border-radius: 50%;
        overflow: hidden;
        img {
          border-radius: 50%;
          width: 100%;
          display: block;
        }
      }
      .info {
        flex: 1;
        padding-left: 10px;
        display: flex;

        div {
          flex: 6;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          p {
            &:nth-of-type(1) {
              font-size: 22rem / 50;
              color: #333;
            }
            &:nth-of-type(2) {
              font-size: 14rem / 50;
              color: #777;
              span {
                color: green;
              }
            }
          }
        }

        .opt {
          flex: 3;
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;

          i {
            text-align: center;
            flex: 2;
            font-size: 40rem / 50;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
