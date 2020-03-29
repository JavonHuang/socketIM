
import moment from 'moment';
import Vue from "vue";
import EXIF from 'exif-js';
Object.merge = function (e, r) {
    "object" != typeof e && (e = {});
    let t = function (e, r) {
        if (r && "object" == typeof r) if (r instanceof Array) {
            e instanceof Array || (e = []);
            for (let n = 0; n < r.length; n++) e[n] = t(e[n], r[n])
        } else e = Object.merge(e, r);
        else e = r;
        return e
    };
    for (let n in r) r.hasOwnProperty(n) && (e[n] = t(e[n], r[n]));
    for (let o = 2,
        f = arguments.length; o < f; o++) Object.merge(e, arguments[o]);
    return e
};

Object.JXmonent = function (format, val) {
    if (val === null || val === '') {
        return ''
    }
    return moment(val).format(format);
};

const common =  {
    /**
     * 图片压缩
     * @param file 图片file格式
     * @param size 压缩触发大小
     * @width width 压缩后图片宽度
     * @param callback
     */
    dataURLtoFile(dataurl, filename,callback) {
        let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        console.log("压缩"+filename+"后图片大小：" + dataurl.length / 1024);
        callback({
            context:dataurl,
            file:new File([u8arr], filename, { type: mime })
        });
    },
     /**
     * 图片压缩
     * @param file 图片file格式
     * @param size 压缩触发大小
     * @width width 压缩后图片宽度
     * @param callback
     */
    compress (file,size,width,callback){
        let that=this;
        EXIF.getData(file, function() {
            let orient = EXIF.getTag(this, "Orientation");
            that.fileChange(file,orient,size,width,callback);
          });
    },
     /**
     * 图片转换检查大小方法
     * @param file 图片file格式
     * @param orient 图片当前方向基数
     * @param size 压缩触发大小
     * @width width 压缩后图片宽度
     * @param callback
     */
    fileChange(file,orient,size,width,callback) {
        let that = this;
        let reader = new FileReader(),
        img = new Image();
        img.setAttribute("crossOrigin", "Anonymous");
        // 选择的文件是图片
        if (file.type.indexOf("image") == 0) {
          reader.readAsDataURL(file);
        }
        reader.onload = function(e) {
          img.src = e.target.result;
          console.log("压缩前"+file.name+"图片大小：" + img.src.length / 1024);
          if (img.src.length / 1024 > size) {
            let image = window.URL.createObjectURL(file);    
            that.dealImage(image, width,orient,file.name,callback,that.dataURLtoFile);
          } else {
            that.dataURLtoFile(img.src,file.name,callback);
          }
        };
      },
     /**
     * 压缩方法
     * @param re 图片相对 路径
     * @param w 压缩之后图片宽度
     * @param o 图片方向
     * @param fileName 图片名称
     * @param callback
     * @param dataURLtoFile 转换成file
     */
    dealImage(re, w,o,fileName,callback,dataURLtoFile) {
        let newImage = new Image();
        let quality = 0.85;
        newImage.src = re;
        newImage.setAttribute("crossOrigin", "Anonymous");
        let imgWidth, imgHeight;
        newImage.onload = function() {
          imgWidth = this.width;
          imgHeight = this.height;
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          if (Math.max(imgWidth, imgHeight) > w) {
            if (imgWidth > imgHeight) {
              canvas.width = w;
              canvas.height = w * imgHeight / imgWidth;
            } else {
              canvas.height = w;
              canvas.width = w * imgWidth / imgHeight;
            }
          } else {
            canvas.width = imgWidth;
            canvas.height = imgHeight;
            quality = 0.5;
          }
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (o && o != 1) {
            switch (o) {
              case 6: // 旋转90度
                canvas.width = imgHeight;
                canvas.height = imgWidth;
                ctx.rotate(Math.PI / 2);
                ctx.drawImage(
                  this,
                  0,
                  -canvas.width,
                  canvas.height,
                  canvas.width
                );
                break;
              case 3: // 旋转180度
                ctx.rotate(Math.PI);
                ctx.drawImage(
                  this,
                  -canvas.width,
                  -canvas.height,
                  canvas.width,
                  canvas.height
                );
                break;
              case 8: // 旋转-90度
                canvas.width = imgHeight;
                canvas.height = imgWidth;
                ctx.rotate(3 * Math.PI / 2);
                ctx.drawImage(
                  this,
                  -canvas.height,
                  0,
                  canvas.height,
                  canvas.width
                );
                break;
            }
          } else {
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
          }
          dataURLtoFile(canvas.toDataURL("image/jpeg", quality),fileName,callback)
        };
      }
}
Vue.prototype.$common = common;