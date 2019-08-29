class Validator {
  validationWrapper(key, options, value) {
    const allowBlank = options["allow_blank"];
    if (allowBlank && !value) {
      return;
    }
    return this[key] && this[key](options, value);
  }

  /*
   * Checks whether the value for the element is present. options -
   * message
   */
  presence(options, value) {
    if (/^\s*$/.test(value !== (undefined || null) ? value : "")) {
      return "cannot be blank";
    }
  }

  /**
   *
   * Checks whether the value is a valid email or not
   */

  email(options, value) {
    if (
      !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
        value
      )
    ) {
      return "should be a valid email";
    }
  }

  /*
   * Check the length of the input value options - message
   * options - message
   *       - minimum - the minimum length of the field value
   *       - maximum - the maximum value of the field value
   */
  length(options, value = "") {
    const validationParams = options.length || {};
    const { maximum, minimum, message } = validationParams;
    if (
      (maximum && value.length > maximum) ||
      (minimum && value.length < minimum)
    ) {
      return message;
    }
    return "";
  }
}

export default new Validator();

export const capitalize = s => {
  if (typeof s !== "string") return "";
  return s
    .split(" ")
    .map(item => item.substring(0, 1).toUpperCase() + item.substring(1))
    .join(" ");
};
