#!/usr/bin/env python3
import os
import subprocess
import json

def get_video_codec(file_path):
    """Gets the video codec of a file using ffprobe."""
    command = [
        'ffprobe',
        '-v', 'error',
        '-select_streams', 'v:0',
        '-show_entries', 'stream=codec_name',
        '-of', 'default=noprint_wrappers=1:nokey=1',
        file_path
    ]
    try:
        result = subprocess.run(command, capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None

def get_audio_codec(file_path):
    """Gets the audio codec of a file using ffprobe."""
    command = [
        'ffprobe',
        '-v', 'error',
        '-select_streams', 'a:0',
        '-show_entries', 'stream=codec_name',
        '-of', 'default=noprint_wrappers=1:nokey=1',
        file_path
    ]
    try:
        result = subprocess.run(command, capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None

def main():
    """
    Processes videos in the assets/videos directory, and creates a JSON file
    with the list of compatible (H.264/AAC) videos.
    """
    video_dir = 'assets/videos'
    output_json = os.path.join(video_dir, 'videos.json')
    compatible_videos = []

    for filename in os.listdir(video_dir):
        if filename.endswith('.mp4'):
            input_path = os.path.join(video_dir, filename)
            video_codec = get_video_codec(input_path)
            audio_codec = get_audio_codec(input_path)

            if video_codec == 'h264' and audio_codec == 'aac':
                print(f"Found compatible video: '{filename}'")
                compatible_videos.append(filename)
            else:
                print(f"Skipping incompatible video: '{filename}' (video: {video_codec}, audio: {audio_codec})")

    with open(output_json, 'w') as f:
        json.dump(sorted(list(set(compatible_videos))), f)

    print(f"Successfully created '{output_json}' with {len(compatible_videos)} videos.")

if __name__ == '__main__':
    main()
