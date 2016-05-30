import $ from 'jquery';
import React, { PropTypes } from 'react';

const levels = ['省份', '城市', '区县'];

class ChinaCity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
      list: props.list,
    };

    this.select = e => {
      const dom = e.target;
      const level = +dom.dataset.level;
      if (level === levels.length - 1 || +dom.value === 0) return;

      this.getList(dom.value, result => {
        const list = this.state.list.map((x, i) => {
          if (i > level) {
            this.refs[`select${i}`].value = 0;
          }
          if (i === level + 1) return result;
          if (i > level + 1) return [];
          return x;
        });
        this.setState({ list });
      });
    };
  }

  componentDidMount() {
    const { selected } = this.state;
    if (!selected) return;
    const result = [
      `${selected / 1000 | 0}000`,
      `${selected / 100 | 0}00`,
      selected,
    ];
    result.forEach((val, index) => {
      this.refs[`select${index}`].value = val;
    });
  }

  getList(id, cb) {
    $.get(`${this.props.route}/${id}`)
      .done(d => {
        if (Array.isArray(d)) cb(d);
      })
      .fail(xhr => {
        console.error(xhr);
      });
  }

  render() {
    return (
      <div>
        {
          levels.map((levelName, index) => (
            <span className="select-wrapper" key={index}>
              <select key={index} onChange={this.select} data-level={index}
                name={levels.length - 1 === index ? this.props.resultName : ''}
                ref={`select${index}`}
              >
                <option value="0">{levelName}</option>
                {(this.state.list[index] || []).map((x, i) => <option key={i} value={x[1]}>{x[0]}</option>)}
              </select>
            </span>
          ))
        }
      </div>
    );
  }
}

ChinaCity.defaultProps = {
  resultName: 'user[city]',
  route: '/china_city',
};

ChinaCity.propTypes = {
  list: PropTypes.array.isRequired,
  selected: PropTypes.number,
  resultName: PropTypes.string,
  route: PropTypes.string,
};

export default ChinaCity;
