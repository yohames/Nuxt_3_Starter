import { defineRule } from "vee-validate";

export default defineNuxtPlugin((vueApp) => {
  defineRule("onerequired", (value, [], ctx) => {
    return !!value || value?.length || "At least one selection required";
  });
  defineRule("multipleChoiceRule", (value, [], ctx) => {
    return value.find((e) => e.answer == true) || "You must select an answer!";
  });

  defineRule("required", (value, [], ctx) => {
    return !!value || value?.length || "Field Required";
  });
  defineRule("boolReq", (value, [], ctx) => {
    return typeof value == "boolean" || "Field Required";
  });

  defineRule("lenInterval", (value, [], context) => {
    if (!value) {
      return true;
    }
    if (
      value?.length >= context.rule.params[0] &&
      value?.length <= context.rule.params[1]
    ) {
      return true;
    } else {
      let show =
        context.rule.params[0] == context.rule.params[1]
          ? `must be ${context.rule.params[0]} digits`
          : `must be between ${context.rule.params[0]} - ${context.rule.params[1]} digits`;
      return `${context.field} ${show}`;
    }
  });
  defineRule("url", (value, context) => {
    return (
      !value ||
      /^((http|https):\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
        value
      ) ||
      "Not valid url"
    );
  });

  defineRule("number", (value) => {
    return !value || /^[0-9]+$/.test(value) || "Number only";
  });
  defineRule("numberFromZero", (value, [], ctx) => {
    return /^(?:0|[1-9]\d*)$/.test(value) || "Number only";
  });
  defineRule("numrange", (value) => {
    return !value || /^[0-9-]+$/.test(value) || "Number only";
  });
  defineRule("email", (value) => {
    return (
      !value ||
      /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        value
      ) ||
      "Not Valid Email"
    );
  });
  defineRule("International_phone_number", (value) => {
    return (
      !value ||
      /^\+(?:[0-9] ?){6,14}[0-9]$/.test(value) ||
      "Not valid phone number"
    );
  });
  defineRule("minLength", (value, [], context) => {
    if (value.length >= context.rule.params[0]) {
      return true;
    } else {
      return `${context.field} is must be greater than ${context.rule.params[0]}`;
    }
  });

  defineRule("ethiopian_phone_number", (value) => {
    return !value || /^\+251[79]\d{8}$/.test(value) || "Not valid phone number";
  });
  defineRule("ethio_phone", (value) => {
    return !value || /^(7|9)\d{8}$/.test(value) || "Not valid phone number";
  });
  defineRule("password", (value) => {
    return !value || value.length >= 8 || "Must be greater than 8";
  });
  defineRule("confirmed", (value, [other]) => {
    return !value || value === other || "Password is not the same";
  });
  defineRule("dyrequiredemail", (value, [other], ctx) => {
    return (
      ctx.rule.params[0] != "email" ||
      !!value ||
      value?.length ||
      "Field Required"
    );
  });
  defineRule("dyrequiredlink", (value, [other], ctx) => {
    return (
      ctx.rule.params[0] != "link" ||
      !!value ||
      value?.length ||
      "Field Required"
    );
  });
  defineRule("validPassword", (value) => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return (
      !value ||
      strongRegex.test(value) ||
      "The password should contain letters, numbers, uppercase and special symbols."
    );
  });
  defineRule("amChar", (value) => {
    return (
      !value ||
      /[\u1200-\u137F]/.test(value.replace(/\s/g)) ||
      "This filed only accepts Amharic characters"
    );
  });
  defineRule("enChar", (value) => {
    return (
      !value ||
      !/[\u1200-\u137F]/.test(value.replace(/\s/g)) ||
      "This filed only accepts English characters"
    );
  });
});
