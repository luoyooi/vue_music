<template>
    <div class="container">
        <router-link :to="{path: '/musics'}">
            <i class="el-icon-d-arrow-left">back</i>
       </router-link>
        <div>
            <img :src="playList[index]? playList[index].cover : ''"/>
            <div class="info">
                <p>{{playList[index]? playList[index].name: ''}}</p>
                <p><span>{{ playList[index] ? playList[index].artist:'' }}</span>·{{ playList[index]?playList[index].albumname : '' }}</p>
            </div>
            <aplayer :audio="playList" :lrcType="3" @listSwitch="changeSong($event)"/>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            index: 0,
            playList: []
        }
    },
    methods: {
        // 切歌的时候更换封面
        changeSong(event){
            this.index = event.id - 1;
        }
    },
    mounted: function () {

        // 读取本地存储的歌曲信息
        var songListStr = window.sessionStorage.getItem('songList');
        var list = JSON.parse(songListStr);

        // 构造播放器需要的数据对象
        var url = '/getsong/song/urls?id=';
        for(let i=0; i<list.length; i++)
        {
            // 拼接播放链接字符串
            url += list[i].songmid + ',';

            // 构造播放数据
            let song = {};
            song.name = list[i].songname;
            song.artist = list[i].singer[0].name;
            song.cover = 'http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_' + list[i].albumid +'_0.jpg';
            song.url = list[i].songmid;
            song.albumname = list[i].albumname;
            this.playList.push(song);
        }

        
        // 把选中的歌曲置顶
        var id = window.sessionStorage.getItem('songmid');
        for(let i=0; i<this.playList.length; i++)
        {
            if(this.playList[i].url == id)
            {
                let item = this.playList[i];
                this.playList[i] = this.playList[0];
                this.playList[0] = item;
            }
        }
        

        // 获取歌曲播放链接
        this.$http.get(url.slice(0, url.length-1))
        .then(result=>{
            for(let i=0; i<this.playList.length; i++)
            {
                this.playList[i].url = result.data.data[this.playList[i].url];
            }
        });
    }
}
</script>

<style lang="less" scoped>
.container{
    box-sizing: border-box;
    width: 100%;
    padding: 8px;
    background-color:#fff;
    

    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: space-around;
    .info{
        p{
            margin: 8px 0;
            &:nth-of-type(1){
                font-size: 20px;
            }
            &:nth-of-type(2){
                font-size: 16px;
            }
        }

        &::before{
            content: '';
            display: block;
            background-color: green;
            width: 100%;
            height: 1px;
        }
    }

    a{
        display: block;
        width: 100%;
        text-decoration: none;
        i{
            display: block;
            width: 100%;
            text-align: center;
            margin: 15px 0;
            color: #ccc;
            font-size: 20px;
        }
    }
}
</style>