import React from "react";
import { View, ViewStyle } from "react-native";
import { GridProps, RowProps, ColumnProps } from "Types";
import Row from "./Row";

const Grid: React.SFC<GridProps> = props => {
  const { children, style } = props;
  let isRow = false;
  const items = React.Children.map(children, (child, index) => {
    if (Array.isArray(children)) {
      if (React.isValidElement<RowProps | ColumnProps>(child)) {
        isRow = child.type == Row;
        const flexStyle: ViewStyle = {
          flex: 1,
          flexDirection: isRow ? "row" : "column"
        };
        return React.cloneElement(child, {
          style: [child.props.style, flexStyle]
        });
      }
      return null;
    }
    return null;
  });

  return (
    <View style={[{ flexDirection: isRow ? "column" : "row" }, style]}>
      {items}
    </View>
  );
};

export default Grid;
