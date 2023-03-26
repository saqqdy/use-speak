[index.md - v1.0.0-alpha.1](README.md) / Exports

# index.md - v1.0.0-alpha.1

## Table of contents

### References

- [default](modules.md#default)

### Interfaces

- [Effect](interfaces/Effect.md)
- [SpeechOptions](interfaces/SpeechOptions.md)

### Type Aliases

- [UtterOptions](modules.md#utteroptions)

### Functions

- [useSpeech](modules.md#usespeech)

## References

### default

Renames and re-exports [useSpeech](modules.md#usespeech)

## Type Aliases

### UtterOptions

Ƭ **UtterOptions**: `Partial`<`Pick`<`SpeechSynthesisUtterance`, `"lang"` \| `"onboundary"` \| `"onend"` \| `"onerror"` \| `"onmark"` \| `"onpause"` \| `"onresume"` \| `"onstart"` \| `"pitch"` \| `"rate"` \| `"text"` \| `"voice"` \| `"volume"`\>\>

#### Defined in

[index.ts:14](https://github.com/saqqdy/use-speak/blob/b812dea/src/index.ts#L14)

## Functions

### useSpeech

▸ **useSpeech**(`options`): `undefined` \| { `cancel`: () => `void` ; `getCurrentUtter`: () => `SpeechSynthesisUtterance` \| `null` ; `getVoice`: () => `SpeechSynthesisVoice` \| `undefined` ; `pause`: () => `void` ; `ready`: `Ref`<`boolean`\> ; `remove`: (`effectKey`: `symbol`) => `boolean` ; `resume`: () => `void` ; `speak`: (`content`: `string`, `utterOptions`: `Partial`<`Pick`<`SpeechSynthesisUtterance`, `"lang"` \| `"onboundary"` \| `"onend"` \| `"onerror"` \| `"onmark"` \| `"onpause"` \| `"onresume"` \| `"onstart"` \| `"pitch"` \| `"rate"` \| `"text"` \| `"voice"` \| `"volume"`\>\>) => [`Effect`](interfaces/Effect.md)[``"key"``] ; `speech`: `SpeechSynthesis` ; `voice`: `ShallowRef`<`undefined` \| `SpeechSynthesisVoice`\> }

#### Parameters

| Name      | Type                                           |
| :-------- | :--------------------------------------------- |
| `options` | [`SpeechOptions`](interfaces/SpeechOptions.md) |

#### Returns

`undefined` \| { `cancel`: () => `void` ; `getCurrentUtter`: () => `SpeechSynthesisUtterance` \| `null` ; `getVoice`: () => `SpeechSynthesisVoice` \| `undefined` ; `pause`: () => `void` ; `ready`: `Ref`<`boolean`\> ; `remove`: (`effectKey`: `symbol`) => `boolean` ; `resume`: () => `void` ; `speak`: (`content`: `string`, `utterOptions`: `Partial`<`Pick`<`SpeechSynthesisUtterance`, `"lang"` \| `"onboundary"` \| `"onend"` \| `"onerror"` \| `"onmark"` \| `"onpause"` \| `"onresume"` \| `"onstart"` \| `"pitch"` \| `"rate"` \| `"text"` \| `"voice"` \| `"volume"`\>\>) => [`Effect`](interfaces/Effect.md)[``"key"``] ; `speech`: `SpeechSynthesis` ; `voice`: `ShallowRef`<`undefined` \| `SpeechSynthesisVoice`\> }

#### Defined in

[index.ts:52](https://github.com/saqqdy/use-speak/blob/b812dea/src/index.ts#L52)
