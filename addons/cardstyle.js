function cardText(title,content = [],footer = '') {
    content = typeof content === 'string' ? content.split('\n') : content;
    const last = content.reduce((a,v,i) => String(v).startsWith('-') ? i : a,-1);
    content = content.map((v,i) => {
        v = String(v);
        return v.startsWith('-') ? `${i === last ? '└─' : '├→'}${v.slice(1)}` : v;
    });

    const width = Math.max(title.length + 4,...content.map(v => v.length + 3),footer.length + 4,28);

    return [
        `╭─ ${title} ${'─'.repeat(Math.max(0,width - title.length - 4))}╮`,
        ...content.map(v => v.startsWith('├→') || v.startsWith('└─') ? v : `│ ${v}`),
        `╰${footer ? `─ ${footer} ` : ''}${'─'.repeat(Math.max(0,width - (footer ? footer.length + 4 : 0)))}╯`
    ].join('\n');
}

function cardDouble(title,content = [],footer = '') {
    content = typeof content === 'string' ? content.split('\n') : content;
    const last = content.reduce((a,v,i) => String(v).startsWith('-') ? i : a,-1);
    content = content.map((v,i) => {
        v = String(v);
        return v.startsWith('-') ? `${i === last ? '╚═' : '╠═'}${v.slice(1)}` : v;
    });

    const width = Math.max(title.length + 4,...content.map(v => v.length + 3),footer.length + 4,28);

    return [
        `╔═ ${title} ${'═'.repeat(Math.max(0,width - title.length - 4))}╗`,
        ...content.map(v => v.startsWith('╠⇒') || v.startsWith('╚═') ? v : `║ ${v}`),
        `╚${footer ? `═ ${footer} ` : ''}${'═'.repeat(Math.max(0,width - (footer ? footer.length + 4 : 0)))}╝`
    ].join('\n');
}

function cardHeavy(title,content = [],footer = '') {
    content = typeof content === 'string' ? content.split('\n') : content;
    const last = content.reduce((a,v,i) => String(v).startsWith('-') ? i : a,-1);
    content = content.map((v,i) => {
        v = String(v);
        return v.startsWith('-') ? `${i === last ? '┗━' : '┣━'}${v.slice(1)}` : v;
    });

    const width = Math.max(title.length + 4,...content.map(v => v.length + 3),footer.length + 4,28);

    return [
        `┏━ ${title} ${'━'.repeat(Math.max(0,width - title.length - 4))}┓`,
        ...content.map(v => v.startsWith('┣━') || v.startsWith('┗━') ? v : `┃ ${v}`),
        `┗${footer ? `━ ${footer} ` : ''}${'━'.repeat(Math.max(0,width - (footer ? footer.length + 4 : 0)))}┛`
    ].join('\n');
}

function cardSquare(title,content = [],footer = '') {
    content = typeof content === 'string' ? content.split('\n') : content;
    const last = content.reduce((a,v,i) => String(v).startsWith('-') ? i : a,-1);
    content = content.map((v,i) => {
        v = String(v);
        return v.startsWith('-') ? `${i === last ? '└─' : '├─'}${v.slice(1)}` : v;
    });

    const width = Math.max(title.length + 4,...content.map(v => v.length + 3),footer.length + 4,28);

    return [
        `┌─ ${title} ${'─'.repeat(Math.max(0,width - title.length - 4))}┐`,
        ...content.map(v => v.startsWith('├') || v.startsWith('└─') ? v : `│ ${v}`),
        `└${footer ? `─ ${footer} ` : ''}${'─'.repeat(Math.max(0,width - (footer ? footer.length + 4 : 0)))}┘`
    ].join('\n');
}
module.exports = sock => {
    sock.cardStyle = cardText;
    sock.cardStyle.text = cardText;
    sock.cardStyle.double = cardDouble;
    sock.cardStyle.square = cardHeavy;
} 