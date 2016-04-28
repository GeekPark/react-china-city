# react-china-city [![Build Status](https://img.shields.io/npm/v/react-china-city.svg)](https://www.npmjs.com/package/react-china-city)
React integration for [china_city](https://github.com/saberma/china_city)

License: [MIT]

### Basic Usage

Ensure you have install `peerDependencies` && **webpack/browserify** with `babel-preset-es2015`

`$ npm i react jquery --save`

`$ npm i react-china-city --save`

```javascript
import ChinaCity from 'react-china-city';

<ChinaCity list={server.city} selected={server.user.city} />
```

List on server side (rails example)

```ruby
@list = get_city_list(user.city)

def get_city_list id
  return ChinaCity.list if id.nil?
  [
    ChinaCity.list,
    ChinaCity.list("#{id/1000}000"),
    ChinaCity.list("#{id/100}00"),
  ]
end
```

### More custom
[PropTypes](https://github.com/geekpark/react-china-city/blob/master/Index.jsx#L76-L86)

### TODO
* 4 level support (街道)
