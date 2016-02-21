from subprocess import check_output, CalledProcessError

magnet_link = raw_input();
download_path = "C:\\nodeDownloads";

try:
    check_output("utorrent /DIRECTORY \"" + download_path + "\" " + magnet_link, shell=True);
except CalledProcessError as exc:
    print "Status : Error", exc.returncode, exc.output;
else:
    print "Started Download";
