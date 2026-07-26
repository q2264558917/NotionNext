/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    
    // 底色
    .dark body{
        background-color: black;
    }

    // 网站名称艺术字效果
    .logo-artistic {
        animation: logo-gradient 4s ease infinite;
        transition: transform 0.3s ease;
    }

    .logo-artistic:hover {
        transform: scale(1.02);
    }

    @keyframes logo-gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

  `}</style>
}

export { Style }
