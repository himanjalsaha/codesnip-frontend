import {
    CodeBlock,
    a11yDark,
    a11yLight,
    anOldHope,
    androidstudio,
    arta,
    atomOneDark,
    atomOneLight,
    codepen,
    dracula,
    far,
    github,
    googlecode,
    hopscotch,
    hybrid,
    irBlack,
    monoBlue,
    monokaiSublime,
    monokai,
    nord,
    noctisViola,
    obsidian,
    ocean,
    paraisoDark,
    paraisoLight,
    pojoaque,
    purebasic,
    railscast,
    rainbow,
    shadesOfPurple,
    solarizedDark,
    solarizedLight,
    sunburst,
    tomorrowNightBlue,
    tomorrowNightBright,
    tomorrowNightEighties,
    tomorrowNight,
    tomorrow,
    vs2015,
    xt256,
    zenburn,
  } from 'react-code-blocks';

 export const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

 export const themes = {
    a11yDark, a11yLight, anOldHope, androidstudio, arta, atomOneDark, atomOneLight,
    codepen, dracula, far, github, googlecode, hopscotch, hybrid, irBlack, monoBlue,
    monokaiSublime, monokai, nord, noctisViola, obsidian, ocean, paraisoDark, paraisoLight,
    pojoaque, purebasic, railscast, rainbow, shadesOfPurple, solarizedDark, solarizedLight,
    sunburst, tomorrowNightBlue, tomorrowNightBright, tomorrowNightEighties, tomorrowNight,
    tomorrow, vs2015, xt256, zenburn,
  };
export const getSpanBgColor = (selectedTheme) => {
    switch (selectedTheme) {
      case a11yDark:
        return 'bg-[#2b2b2b] text-[#f8f8f2]';
      case a11yLight:
        return 'bg-[#fefefe] text-[#545454]';
      case anOldHope:
        return 'bg-[#1c1d21] text-[#c0caf5]';
      case androidstudio:
        return 'bg-[#282b2e] text-[#a9b7c6]';
      case arta:
        return 'bg-[#222] text-[#f8f8f2]';
      case atomOneDark:
        return 'bg-[#282c34] text-[#abb2bf]';
      case atomOneLight:
        return 'bg-[#fafafa] text-[#383a42]';
      case codepen:
        return 'bg-[#222] text-[#f8f8f2]';
      case dracula:
        return 'bg-[#282a36] text-[#f8f8f2]';
      case far:
        return 'bg-[#000080] text-[#dcdcdc]';
      case github:
        return 'bg-[#ffffff] text-[#333333]';
      case googlecode:
        return 'bg-[#f8f8f8] text-[#000000]';
      case hopscotch:
        return 'bg-[#322931] text-[#ffffff]';
      case hybrid:
        return 'bg-[#1d1f21] text-[#c5c8c6]';
      case irBlack:
        return 'bg-[#000000] text-[#f8f8f8]';
      case monoBlue:
        return 'bg-[#eaeef3] text-[#383a42]';
      case monokaiSublime:
        return 'bg-[#23241f] text-[#f8f8f2]';
      case monokai:
        return 'bg-[#272822] text-[#f8f8f2]';
      case nord:
        return 'bg-[#2e3440] text-[#d8dee9]';
      case noctisViola:
        return 'bg-[#30243d] text-[#a599e9]';
      case obsidian:
        return 'bg-[#282b2e] text-[#f8f8f2]';
      case ocean:
        return 'bg-[#2b303b] text-[#c0c5ce]';
      case paraisoDark:
        return 'bg-[#2f1e2e] text-[#a39e9b]';
      case paraisoLight:
        return 'bg-[#e7e9db] text-[#4f424c]';
      case pojoaque:
        return 'bg-[#181914] text-[#f8f8f2]';
      case purebasic:
        return 'bg-[#ffffdf] text-[#333333]';
      case railscast:
        return 'bg-[#232323] text-[#e6e1dc]';
      case rainbow:
        return 'bg-[#474646] text-[#f8f8f2]';
      case shadesOfPurple:
        return 'bg-[#2d2b57] text-[#fad000]';
      case solarizedDark:
        return 'bg-[#002b36] text-[#839496]';
      case solarizedLight:
        return 'bg-[#fdf6e3] text-[#657b83]';
      case sunburst:
        return 'bg-[#000000] text-[#f8f8f2]';
      case tomorrowNightBlue:
        return 'bg-[#002451] text-[#ffffff]';
      case tomorrowNightBright:
        return 'bg-[#000000] text-[#f8f8f2]';
      case tomorrowNightEighties:
        return 'bg-[#2d2d2d] text-[#cccccc]';
      case tomorrowNight:
        return 'bg-[#1d1f21] text-[#c5c8c6]';
      case tomorrow:
        return 'bg-[#ffffff] text-[#4d4d4c]';
      case vs2015:
        return 'bg-[#1e1e1e] text-[#dcdcdc]';
      case xt256:
        return 'bg-[#000000] text-[#f8f8f2]';
      case zenburn:
        return 'bg-[#3f3f3f] text-[#dcdccc]';
      default:
        return 'bg-[#282a36] text-[#f8f8f2]'; // Default to dracula theme
    }
  };