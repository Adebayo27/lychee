/* eslint-disable react/prop-types */
import { makeStyles } from "@mui/styles";
import { FormControl, MenuItem, Select } from "@mui/material";
const useStyles = makeStyles(() => ({
  formControl: {
    "& .MuiInputBase-root": {
      border: "1px solid #EBEBEB",
      borderStyle: "solid",
      borderRadius: "5px",
      minWidth: "120px",
      height: '35px',
      justifyContent: "center"
    },
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "0px"
    }
  },
  select: {
    width: "auto",
    paddingRight: '90px !important',
    // height: '32px !important',
    fontSize: "13px !important",
    borderRadius: "8px !important",
    fontWeight: '600 !important',
    fontFamily: 'Manrope',
    // border: " 1px solid #EBEBEB",
    "&:focus": {
      backgroundColor: "transparent"
    }
  },
  selectIcon: {
    position: "relative",
    color: "#3B4154",
    fontSize: "14px"
  },
  paper: {
    marginTop: 8
  },
  list: {
    paddingTop: 2,
    paddingBottom: 2,
    "& li": {
      fontWeight: 200,
      paddingTop: 2,
      paddingBottom: 2,
      fontSize: "12px"
    },
    "& li.Mui-selected": {
      color: "white",
      background: "#3B4154"
    },
    "& li.Mui-selected:hover": {
      background: "#3B4154"
    }
  }
}));

const CustomDropDown = ({ value, handleChange, items, defaultValue }) => {
  const classes = useStyles();

  const menuProps = {
    classes: {
      list: classes.list,
      paper: classes.paper
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center"
    },
    getContentAnchorEl: null
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        value={value}
        onChange={handleChange}
        defaultValue={defaultValue}
        MenuProps={menuProps}
        classes={{
          select: classes.select,
          icon: classes.selectIcon
        }}
      >
        {items?.map((item) => (
          <MenuItem key={item.key} value={item.value}>
            {item.key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomDropDown;
