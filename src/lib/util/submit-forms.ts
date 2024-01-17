import axios from 'axios'

const HUBSPOT_ID = process.env.NEXT_PUBLIC_HUBSPOT_ID

const postPreferenceFields = async (
  data: any,
  portalId?: string,
  formGuid?: string,
  config?: any,
  hutk?: string
) => {
  const dataFields = [
    { name: 'firstname', value: data.first_name },
    { name: 'lastname', value: data.last_name },
    { name: 'email', value: data.email },
    { name: 'city', value: data.city },
    { name: 'country', value: data.country },
    { name: 'zip', value: data.zip },

    {
      name: 'what_kind_of_home_are_you_looking_for_',
      value: data.what_kind_of_home_are_you_looking_for_
        ? data.what_kind_of_home_are_you_looking_for_.join(';')
        : '',
    },
    { name: 'home_type', value: data.home_type },
    {
      name: 'will_this_be_your_primary_home_',
      value: data.will_this_be_your_primary_home_
        ? data.will_this_be_your_primary_home_.join(';')
        : '',
    },
    { name: 'primaryorsecondaryother', value: data.primaryorsecondaryother },
    {
      name: 'locations_of_interest',
      value: data.locations_of_interest
        ? data.locations_of_interest.join(';')
        : '',
    },
    { name: 'city_general', value: data.City ? data.City : '' },
    {
      name: 'what_are_your_preferred_neighborhoods_',
      value: data.what_are_your_preferred_neighborhoods_
        ? data.what_are_your_preferred_neighborhoods_
        : '',
    },
    {
      name: 'bedroom_preference',
      value: data.bedroom_preference ? data.bedroom_preference : '',
    },
    {
      name: 'which_amenities_are_most_important_to_you_',
      value: data.which_amenities_are_most_important_to_you_
        ? data.which_amenities_are_most_important_to_you_.join(';')
        : '',
    },
    {
      name: 'price_range',
      value: data.price_range ? data.price_range.join(';') : '',
    },
    {
      name: 'buyingtimelinedec2023',
      value: data.buyingtimelinedec2023 ? data.buyingtimelinedec2023 : '',
    },
    {
      name: 'purchase_type',
      value: data.purchase_type ? data.purchase_type : '',
    },
    {
      name: 'would_you_like_help_selling_your_current_home_',
      value: data.would_you_like_help_selling_your_current_home_
        ? data.would_you_like_help_selling_your_current_home_
        : '',
    },
  ]
  return await axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      portalId,
      formGuid,
      fields: dataFields,
      context: {
        hutk: hutk ? hutk : undefined,
        pageUri: document.URL,
        pageName: document.title,
      },
    },
    config
  )
}
const postModalFields = async (
  data: any,
  portalId?: string,
  formGuid?: string,
  config?: any,
  hutk?: string
) => {
  const dataFields = [
    { name: 'firstname', value: data.first_name },
    { name: 'lastname', value: data.last_name },
    { name: 'email', value: data.email },
    {
      name: 'bedroom_preference',
      value: data.bedroom_preference ? data.bedroom_preference.join(';') : '',
    },
    {
      name: 'interested_cities',
      value: data.locations_of_interest
        ? data.locations_of_interest.join(';')
        : '',
    },
    {
      name: 'price_range',
      value: data.price_range ? data.price_range.join(';') : '',
    },
    {
      name: 'buyingtimelinedec2023',
      value: data.buyingtimelinedec2023 ? data.buyingtimelinedec2023 : '',
    },
    { name: 'city_general', value: data.City ? data.City : '' },
    {
      name: 'current_country',
      value: data.current_country ? data.current_country : '',
    },
    {
      name: 'current_zip_code',
      value: data.current_zip_code ? data.current_zip_code : '',
    },
  ]
  return await axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      portalId,
      formGuid,
      fields: dataFields,
      context: {
        hutk: hutk ? hutk : undefined,
        pageUri: document.URL,
        pageName: document.title,
      },
    },
    config
  )
}
const postContactFields = async (
  data: any,
  portalId?: string,
  formGuid?: string,
  config?: any,
  hutk?: string
) => {
  return await axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      portalId,
      formGuid,
      fields: [
        { name: 'email', value: data.email },
        { name: 'firstname', value: data.first_name },
        { name: 'lastname', value: data.last_name },
        { name: 'hs_persona', value: data.hs_persona },
        { name: 'message', value: data.message },
      ],
      context: {
        huhutk: hutk ? hutk : undefined,
        pageUri: document.URL,
        pageName: document.title,
      },
    },
    config
  )
}

const postNewsletterFields = async (
  data: any,
  portalId?: string,
  formGuid?: string,
  config?: any,
  hutk?: string
) => {
  return await axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      portalId,
      formGuid,
      fields: [
        { name: 'firstname', value: data.first_name },
        { name: 'lastname', value: data.last_name },
        {
          name: 'email',
          value: data.email,
        },
      ],
      context: {
        hutk: hutk ? hutk : undefined,
        pageUri: document.URL,
        pageName: document.title,
      },
    },
    config
  )
}

const postUnitFields = async (
  data: any,
  portalId?: string,
  formGuid?: string,
  config?: any,
  hutk?: string
) => {
  return await axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      portalId,
      formGuid,
      fields: [
        {
          name: 'firstname',
          value: data.first_name,
        },
        {
          name: 'lastname',
          value: data.last_name,
        },
        {
          name: 'email',
          value: data.email,
        },
        {
          name: 'phone',
          value: data.phone,
        },
        {
          name: 'unit_of_interest',
          value: data.unit_of_interest,
        },
      ],
      context: {
        hutk: hutk ? hutk : undefined,
        pageUri: document.URL,
        pageName: document.title,
      },
    },
    config
  )
}
const postBrokerFields = async (
  data: any,
  portalId?: string,
  formGuid?: string,
  config?: any,
  hutk?: string
) => {
  return await axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      portalId,
      formGuid,
      fields: [
        {
          name: 'firstname',
          value: data.first_name,
        },
        {
          name: 'lastname',
          value: data.last_name,
        },

        {
          name: 'email',
          value: data.email,
        },
      ],
      context: {
        hutk: hutk ? hutk : undefined,
        pageUri: document.URL,
        pageName: document.title,
      },
    },
    config
  )
}
const postStartedSubmitFields = async (
  data: any,
  portalId?: string,
  formGuid?: string,
  config?: any,
  hutk?: string
) => {
  return await axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      portalId,
      formGuid,
      fields: [
        {
          name: 'firstname',
          value: data.first_name,
        },
        {
          name: 'lastname',
          value: data.last_name,
        },

        {
          name: 'email',
          value: data.email,
        },
      ],
      context: {
        pageUri: document.URL,
        pageName: document.title,
      },
    },
    config
  )
}

export const submitForm = async (
  data: any,
  audienceId: string,
  formType: string,
  hutk?: string
) => {
  const portalId = HUBSPOT_ID
  const formGuid = audienceId
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  let response = null
  if (formType === 'newsletter') {
    response = await postNewsletterFields(
      data,
      portalId,
      formGuid,
      config,
      hutk
    )
  } else if (formType === 'modal') {
    response = await postModalFields(data, portalId, formGuid, config, hutk)
  } else if (formType === 'contact') {
    response = await postContactFields(data, portalId, formGuid, config, hutk)
  } else if (formType === 'unit') {
    response = await postUnitFields(data, portalId, formGuid, config, hutk)
  } else if (formType === 'broker') {
    response = await postBrokerFields(data, portalId, formGuid, config, hutk)
  } else if (formType === 'started_submit') {
    response = await postStartedSubmitFields(
      data,
      portalId,
      formGuid,
      config,
      hutk
    )
  } else if (formType === 'preference') {
    response = await postPreferenceFields(
      data,
      portalId,
      formGuid,
      config,
      hutk
    )
  }

  return response
}
