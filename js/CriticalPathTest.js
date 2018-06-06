/**
 * Created by GJS on 2018/6/4.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ScrollView,
  Text,
  InteractionManager,
} from 'react-native'
import { Button } from 'antd-mobile'

import GraphUtil from './Graph/GraphUtil'

export default class CriticalPathTest extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.graph = null;
  }
  componentWillMount () {
    // console.log('componentWillMount')
  }

  componentDidMount () {
    // console.log('componentDidMount')
    InteractionManager.runAfterInteractions(() => {
      this._fetchData();
    });
  }

  componentWillUnmount () {
    // console.log('componentWillUnmount')
  }

  _fetchData = (params: Object) => {
    toast.loading();
    http.get('http://10.23.74.244:10086/YuanXinApi/PlanManageReat/GetProjectProgress', {
      params: params})
      .then(function (response) {
        // console.log(response);
        toast.hide();
        toast.success('请求成功');
        this.graph = GraphUtil.createGraph(response.data);
        // GraphUtil.printGraph(this.graph); // 没事不要打印，数据量蛮大的
        // 关键路径
        // 返回一个对象{cPathByVertexes, cPathByEdges}
        // cPathByVertexes: 关键路径上的点
        // cPathByEdges: 关键路径上的边
        let cPath = GraphUtil.criticalPath(this.graph);
        console.log(cPath);
        let printStr = '关键路径：'
        let events = cPath.cPathByVertexes;
        let activities = cPath.cPathByEdges;
        for (let i=0;i<events.length;i++) {
          let event = events[i];
          if (i === events.length - 1) {
            printStr += '(' + event.data.name + ')';
            break;
          }
          let activity = activities[i];
          let task = activity.data.task;
          if (activity.weight > 0) {
            printStr += '(' + event.data.name + ')-->' + '{{' + task.taskName + ':用时 ' + activity.weight + '}}-->';
          } else { // 长度为0是虚拟的边，即没有活动(活动时间为0)
            printStr += '(' + event.data.name + ')-->';
          }
        }
        console.log(printStr);
      })
      .catch(function (error) {
        console.log(error);
        toast.hide();
        toast.fail('请求失败：' + JSON.stringify(error));
      });
  }

  render () {
    const {navigation} = this.props
    return (
      <ScrollView style={{flex: 1, backgroundColor: 'aliceblue'}}>
        <Button onClick={() => {
          navigation.goBack(null)
        }}>
          {'Back'}
        </Button>

      </ScrollView>
    )
  }
}
