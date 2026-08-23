# Licensed dialogue scene pack checklist

This project can play short film-style dialogue references, but a clip must not be published merely because it is short, recognizable, or already available online. Add a commercial movie clip only after the site has written permission or a license that covers this use, or after documented confirmation that the recording is in the public domain in every territory served.

## 中文接入结论

商业电影的“经典台词原声”不能直接从影片、流媒体或视频网站截取后上线。每个片段至少需要可覆盖互动网页播放、用户模仿录音、目标地区和广告变现的书面授权；还要确认对白表演、录音制品、配乐及片段内其他第三方权利均已处理。只有资料齐全并经过权利审核的音频，才能替换当前 AI 设计的原创语音表演。

交付一段真实电影原声时，请同时提供：音频文件、片名、角色、场景、展示台词、中英文文案、授权方、授权文件、地区、期限、是否允许剪辑及商业化。授权证明不得放入网站的公开目录，只在内容包中展示简短的公开授权状态。

## Required delivery for every clip

- A web-ready audio file owned or licensed by the publisher (`.wav`, `.mp3`, or `.ogg`).
- Film or source title, character, scene description, and the exact displayed line.
- Rights holder and licensor contact.
- License or permission document, including territory, term, media, editing rights, and whether advertising/monetization is allowed.
- Proof that performer, music, and sound-recording rights are included when they exist in the clip.
- An internal rights-expiry date and the person responsible for renewal or takedown.
- English and Chinese copy that has been reviewed separately from the audio rights.

Do not place the license document or private contact details in `public/`. Keep the proof in a restricted business record and put only a short public-facing rights label in the pack JSON.

## Pack entry

```json
{
  "id": "licensed-scene-id",
  "quote": "Displayed English line",
  "quoteZh": "展示的中文台词",
  "sourceTitle": "Licensed source title",
  "sourceTitleZh": "已获授权的片名",
  "character": "Character name",
  "characterZh": "角色名",
  "scene": "Short scene description",
  "sceneZh": "简短场景说明",
  "rights": "Licensed from Rights Holder · expires YYYY-MM-DD",
  "rightsZh": "已获权利方授权 · YYYY-MM-DD 到期",
  "mediaKind": "spoken-dialogue",
  "generator": "provider/model:mode",
  "direction": "Performance direction",
  "directionZh": "表演提示",
  "audioUrl": "/audio/licensed-scene-id.mp3",
  "audioUrlZh": "/audio/licensed-scene-id-zh.mp3",
  "category": "Drama · controlled intensity",
  "categoryZh": "剧情 · 克制的强度",
  "durationMs": 3200,
  "durationMsZh": 3400,
  "reference": {
    "durationMs": 3200,
    "energy": [0.1, 0.3, 0.6, 0.4, 0.1],
    "pitchHz": [180, 190, 210, 195, 175]
  },
  "referenceZh": {
    "durationMs": 3400,
    "energy": [0.1, 0.4, 0.5, 0.3, 0.1],
    "pitchHz": [220, 240, 260, 230, 200]
  }
}
```

## Release gate

1. Confirm the playable file is exactly the file covered by the license.
2. Confirm the license permits interactive web playback, imitation/recording, the target territories, and monetization.
3. Confirm no unrelated soundtrack or third-party material remains in the excerpt.
4. Enter the expiry date in the rights register and schedule a pre-expiry review.
5. Test English and Chinese metadata, playback, recording, scoring, keyboard navigation, and mobile microphone access.
6. Publish only after the responsible rights reviewer signs off.

The current `starter-sparks` pack is deliberately marked as AI-designed spoken performances generated with Qwen3-TTS Voice Design. It combines original scenes with short public-domain excerpts or our translations/adaptations of ancient and public-domain works. Its English and Chinese WAV files validate the product flow, but they are not presented as recordings from commercial films or imitations of real actors.
