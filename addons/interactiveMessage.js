module.exports = function (conn) {
  const baileys = conn.baileys;
  const { proto } = baileys
  
  
  const type = x => x?.constructor?.name || (x === null ? "null" : "undefined")
  const isStringSame = (x, y) => Array.isArray(y) ? y.includes(x) : y === x
  
  const buttonTypes = ["single_select", "quick_reply", "cta_url", "cta_call", "cta_copy", "cta_reminder", "cta_cancel_reminder", "address_message", "send_location"]
  
  /**
   * @typedef Media
   * @prop {"image"|"video"|"document"} type
   * @prop {buffer|{ url: string }} data
   * @prop {{}} [options]
   */
  /**
   * @typedef Button
   * @prop {"single_select"|"quick_reply"|"cta_url"|"cta_call"|"cta_copy"|"cta_reminder"|"cta_cancel_reminder"|"address_message"|"send_location"} type
   * @prop {string} [title] single_select use this
   * @prop {Section[]} [sections]
   * @prop {string} [display_text] quick_reply, cta_reminder, cta_cancel_reminder, address_message, cta_call, cta_url, cta_copy use this
   * @prop {string} [id] quick_reply, cta_reminder, cta_cancel_reminder, address_message use this
   * @prop {string} [phone_number] cta_call use this
   * @prop {string} [url] cta_url use this
   * @prop {string} [merchant_url] cta_url use this
   * @prop {string} [copy_code] cta_copy use this
   */
  /**
   * @typedef Section
   * @prop {string} title
   * @prop {string} highlight_label
   * @prop {Row[]} rows
   */
  /**
   * @typedef Row
   * @prop {string} header
   * @prop {string} title
   * @prop {string} description
   * @prop {string} id
   */
  
  /**
   * Function to send interactiveMessage
   *
   * @param {string} jid
   * @param {string} body
   * @param {string} [footer]
   * @param {string} title
   * @param {string} [subtitle]
   * @param {Media} [media]
   * @param {Button[]} buttons
   * @param {proto.WebMessageInfo} [quoted]
   * @param {{}} [options={}]
   * @returns {Promise<proto.WebMessageInfo>}
   */
  async function sendInteractiveMessage(jid, body, footer, title, subtitle, media, buttons, quoted, options = {}) {
    // ### Start of validation ###
    if(type(jid) !== "String") throw TypeError(`jid only accepts String, type given: ${type(jid)}`)
    if(type(body) !== "String") throw TypeError(`body only accepts String, type given: ${type(body)}`)
    if(footer && type(footer) !== "String") throw TypeError(`footer only accepts String, type given: ${type(footer)}`)
    if(type(title) !== "String") throw TypeError(`title only accepts String, type given: ${type(title)}`)
    if(subtitle && type(subtitle) !== "String") throw TypeError(`subtitle only accepts String, type given: ${type(subtitle)}`)
    if(media && type(media) !== "Object") throw TypeError(`media only accepts Object, type given: ${type(media)}`)
    if(!Array.isArray(buttons)) throw TypeError(`buttons only accepts Array, type given: ${type(buttons)}`)
    if(quoted && (type(quoted) !== "Object" && type(quoted) !== "WebMessageInfo" && type(quoted) !== "Message")) throw TypeError(`quoted only accepts Object, WebMessageInfo, and Message, type given: ${type(quoted)}`)
    if(options && type(options) !== "Object") throw TypeError(`options only accepts Object, type given: ${type(options)}`)
  
    if(media) {
      if(type(media.type) !== "String") throw new TypeError(`media.type only accepts String, type given: ${type(media.type)}`)
      if(type(media.data) !== "Buffer" && type(media.data) !== "Object") throw new TypeError(`media.data only accepts Buffer or Object, type given: ${type(media.data)}`)
      if(media.options && type(media.options) !== "Object") throw new TypeError(`media.options only accepts Object, type given: ${type(media.type)}`)
      if(!isStringSame(media.type, ["image", "video", "document"])) throw new TypeError(`media.type only accepts image, video, or document. Value given: ${media.type}`)
      if(!media.data?.url && type(media.data) !== "Buffer") throw new TypeError(`media.data only accepts Buffer or Object with url key, type given: ${type(media.data)}`)
    }
    for(const i in buttons) {
      const button = buttons[i]
      if(type(button.type) !== "String") throw new TypeError(`buttons[${i}].type only accepts String, type given: ${type(button.type)}`)
      if(!isStringSame(button.type, buttonTypes)) throw new TypeError(`buttons[${i}].type is not supported. Type given: ${button.type}`)
  
      switch(button.type) {
        default: {
          throw new Error("wait... how is that possible??")
        }
  
        case "single_select": {
          if(type(button.title) !== "String") throw new TypeError(`buttons[${i}].title only accepts String, type given: ${type(button.title)}`)
          if(type(button.sections) !== "Array") throw new TypeError(`buttons[${i}].sections only accepts Array, type given: ${type(button.sections)}`)
          for(const ii in button.sections) {
            if(type(button.sections[ii].title) !== "String") throw new TypeError(`buttons[${i}].sections[${ii}].title only accepts String, type given: ${type(button.sections[ii].title)}`)
            if(type(button.sections[ii].highlight_label) !== "String") throw new TypeError(`buttons[${i}].sections[${ii}].highlight_label only accepts String, type given: ${type(button.sections[ii].highlight_label)}`)
            if(type(button.sections[ii].rows) !== "Array") throw new TypeError(`buttons[${i}].sections[${ii}].rows only accepts Array, type given: ${type(button.sections[ii].rows)}`)
            for(const iii in button.sections[ii].rows) {
              if(type(button.sections[ii].rows[iii].header) !== "String") throw new TypeError(`buttons[${i}].rows[iii].sections[${ii}].rows[iii].header only accepts String, type given: ${type(button.sections[ii].rows[iii].header)}`)
              if(type(button.sections[ii].rows[iii].title) !== "String") throw new TypeError(`buttons[${i}].rows[iii].sections[${ii}].rows[iii].title only accepts String, type given: ${type(button.sections[ii].rows[iii].title)}`)
              if(type(button.sections[ii].rows[iii].description) !== "String") throw new TypeError(`buttons[${i}].rows[iii].sections[${ii}].rows[iii].description only accepts String, type given: ${type(button.sections[ii].rows[iii].description)}`)
              if(type(button.sections[ii].rows[iii].id) !== "String") throw new TypeError(`buttons[${i}].rows[iii].sections[${ii}].rows[iii].id only accepts String, type given: ${type(button.sections[ii].rows[iii].id)}`)
            }
          }
          break
        }
        case "quick_reply":
        case "cta_reminder":
        case "cta_cancel_reminder":
        case "address_message": {
          if(type(button.display_text) !== "String") throw new TypeError(`buttons[${i}].display_text only accepts String, type given: ${type(button.display_text)}`)
          if(type(button.id) !== "String") throw new TypeError(`buttons[${i}].id only accepts String, type given: ${type(button.id)}`)
          break
        }
        case "cta_call": {
          if(type(button.display_text) !== "String") throw new TypeError(`buttons[${i}].display_text only accepts String, type given: ${type(button.display_text)}`)
          if(type(button.phone_number) !== "String") throw new TypeError(`buttons[${i}].phone_number only accepts String, type given: ${type(button.phone_number)}`)
          break
        }
        case "cta_url": {
          if(type(button.display_text) !== "String") throw new TypeError(`buttons[${i}].display_text only accepts String, type given: ${type(button.display_text)}`)
          if(type(button.url) !== "String") throw new TypeError(`buttons[${i}].url only accepts String, type given: ${type(button.url)}`)
          if(type(button.merchant_url) !== "String") throw new TypeError(`buttons[${i}].merchant_url only accepts String, type given: ${type(button.merchant_url)}`)
          break
        }
        case "cta_copy": {
          if(type(button.display_text) !== "String") throw new TypeError(`buttons[${i}].display_text only accepts String, type given: ${type(button.display_text)}`)
          if(type(button.copy_code) !== "String") throw new TypeError(`buttons[${i}].copy_code only accepts String, type given: ${type(button.copy_code)}`)
          break
        }
        case "send_location": {
          break
        }
      }
    }
    if(buttons.length > 10) throw new RangeError("maximum is 10 buttons")
    // ### End of validation ###
  
    // ### Start of sending message ###
    const msg = baileys.generateWAMessageFromContent(jid, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: body
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
              text: footer
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
              title,
              subtitle,
              hasMediaAttachment: !!media,
              ...(media ? await baileys.generateWAMessageContent({
                [media.type]: media.data,
                ...(media.options || {})
              }, {
                upload: conn.waUploadToServer
              }) : {})
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
              buttons: buttons.map((v) => {
                const { type } = v
                delete v.type
                return {
                  name: type,
                  buttonParamsJson: JSON.stringify(v)
                }
              })
            }),
            contextInfo: {
              mentionedJid: options.mentions || [],
              ...options.contextInfo,
              ...(quoted ? {
                stanzaId: quoted.key.id,
                remoteJid: quoted.key.remoteJid,
                participant: quoted.key.participant || quoted.key.remoteJid,
                fromMe: quoted.key.fromMe,
                quotedMessage: quoted.message
              } : {})
            }
          })
        }
      }
    }, {})
    await conn.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: `BarqahXiexGantengINIVirtualBot${(new Date().getTime())}`
    })
    // ### End of sending message ###
  
    return msg
  }
  conn.sendInteractiveMessage = sendInteractiveMessage;
  conn.InteractiveButton = (button = [])=>button.map(v => {
    const params = JSON.parse(v.buttonParamsJson);
    v.type = v.name;
    Object.keys(params).forEach(e => (v[e] = params[e]));
    return v;
  })

}